import { AuthService } from './../auth/auth.service';
import { Injectable } from '@nestjs/common';
import { CreateCustomerDto } from './dto/create-customer.dto';
import { UpdateCustomerDto } from './dto/update-customer.dto';
import { CustomersRepository } from './repositories/customers.repository';
import { CreateGymUserDto } from 'src/users/dto/create-gym-user.dto';
import { PaymentsService } from 'src/payments/payments.service';
import { CreatePaymentDto } from 'src/payments/dto/create-payment.dto';
import { Resend } from 'resend';
import { EditGymUserDto } from 'src/users/dto/edit-gym-user.dto';
import { RenewMembershipDto } from './dto/renew-membership.dto';
import { MembershipsService } from 'src/memberships/memberships.service';

@Injectable()
export class CustomersService {
  constructor(
    private customerRepository: CustomersRepository,
    private authService: AuthService,
    private paymentsService: PaymentsService,
    private membershipService: MembershipsService,
  ) {}

  async create(
    tenantId: string,
    customer: CreateCustomerDto,
    file?: Express.Multer.File,
  ) {
    //? create auth for customer & create user backup
    const randomstring = Math.random().toString(36).slice(-8);
    const gymUserDto = new CreateGymUserDto();
    gymUserDto.email = customer.email;
    gymUserDto.name = `${customer.name} ${customer.lastName}`;
    gymUserDto.password = randomstring;
    gymUserDto.type = 'C';
    const uid = await this.authService.createGymUser(tenantId, gymUserDto);
    customer['userId'] = uid;

    //? upload picture if file present & get url
    let pictureUrl = '';
    if (file != null) {
      pictureUrl = await this.customerRepository.uploadPicture(
        tenantId,
        uid,
        file,
      );
      customer['pictureUrl'] = pictureUrl;
    }

    //? create payment object
    const membershipData = await this.membershipService.getById(tenantId, customer.membershipId);
    const paymentDto = new CreatePaymentDto();
    paymentDto.membershipId = membershipData.id;
    paymentDto.membershipName = membershipData.name;
    paymentDto.currency = membershipData.currency;
    paymentDto.paidAmount = customer.paidAmount;
    paymentDto.paymentMethod = customer.paymentMethod;
    paymentDto.isReferred =
      customer.metBy.toLocaleLowerCase().includes('referido') ||
      customer.metBy.toLocaleLowerCase().includes('referida');
    paymentDto.customerSex = customer.sex;
    paymentDto.customerFullName = `${customer.name} ${customer.lastName}`;
    paymentDto.paymentDate = customer.membershipStartDate;

    //? create customer & link pictureUrl, userId
    const customerId = await this.customerRepository.create(tenantId, customer);

    //? add customerId to payment object
    paymentDto.customerId = customerId;
    await this.paymentsService.create(tenantId, paymentDto);
    return customerId;
  }

  findAll(tenantId: string) {
    return this.customerRepository.getAll(tenantId);
  }
  
  findPaginated(tenantId: string, after?: string) {
    return this.customerRepository.getPaginated(tenantId, after);
  }

  getCustomerMembership(tenantId: string, customerId: string) {
    return this.customerRepository.getCustomerMembership(tenantId, customerId);
  }

  async update(tenantId: string, id: string, updateCustomerDto: UpdateCustomerDto) {
    await this.customerRepository.update(tenantId, id, updateCustomerDto);
    const editGymUserDto = new EditGymUserDto();
    editGymUserDto.name = `${updateCustomerDto.name} ${updateCustomerDto.lastName}`;
    editGymUserDto.email = updateCustomerDto.email;
    editGymUserDto.type = 'C';
    await this.authService.editGymUser(tenantId, updateCustomerDto.userId, editGymUserDto);
  }

  async renewMembership(tenantId: string, renewMembershipDto: RenewMembershipDto) {
    await this.customerRepository.updateMembership(tenantId, renewMembershipDto);
    const membershipData = await this.membershipService.getById(tenantId, renewMembershipDto.membershipId);
    const customerData = await this.customerRepository.getById(tenantId, renewMembershipDto.customerId);
    
    // create payment object
    const paymentDto = new CreatePaymentDto();
    paymentDto.customerId = renewMembershipDto.customerId;
    paymentDto.paidAmount = renewMembershipDto.paidAmount;
    paymentDto.paymentMethod = renewMembershipDto.paymentMethod;
    paymentDto.currency = membershipData.currency;
    paymentDto.paymentDate = renewMembershipDto.membershipStartDate;
    paymentDto.membershipId = renewMembershipDto.membershipId;
    paymentDto.membershipName = membershipData.name;
    paymentDto.isReferred = customerData.metBy.toLocaleLowerCase().includes('referido') || customerData.metBy.toLocaleLowerCase().includes('referida');
    paymentDto.customerSex = customerData.sex;
    paymentDto.customerFullName = `${customerData.name} ${customerData.lastName}`;

    await this.paymentsService.create(tenantId, paymentDto);
  }

  async freezeMembership(tenantId: string, data: any) {
    await this.customerRepository.freezeMembership(tenantId, data);
  }

  remove(tenantId: string, id: string) {
    console.log(tenantId);
    return `This action removes a #${id} customer`;
  }

  sendQrEmail(email: string, qrData: Express.Multer.File) {
    const resend = new Resend(process.env.emailKey);
    (async function () {
      const { data, error } = await resend.emails.send({
        from: 'Kinetic-NoReply <no-reply@kineticjustmove.com>',
        to: [email],
        subject: '¡Bienvenido/a a Kinetic!',
        html: `<div>
        <p><strong>¡Bienvenido/a a Kinetic!</strong><br>
        Estamos emocionados de que te unás a nuestra vibrante comunidad, donde cada movimiento es una celebración de la vida y el bienestar. Aquí encontrarás un espacio para disfrutar, aprender y crecer junto a personas que comparten tu pasión por un estilo de vida saludable y activo.</p>

        <p><strong>*Tu código QR de acceso*</strong><br>
        Para facilitar tu ingreso a nuestras instalaciones, te hemos enviado adjunto a este correo tu código QR único. Este código es tu llave personal a un mundo de bienestar y alegría. Aquí te dejamos algunos tips para que siempre lo tengás a mano:</p>

        <ul>- Guardá la imagen en tus favoritos: Abrí la imagen del código QR y guardala en el álbum de 'Favoritos' de tu galería de fotos, así podrás acceder a ella rápidamente al ingresar al centro.</ul>

        <ul>- Agregalo a tu billetera digital: Si utilizás un dispositivo móvil, podés añadir la imagen del código QR a tu billetera digital. Esto te permitirá tenerlo a mano sin necesidad de buscarlo en tus imágenes.</ul>

        <ul>- Enviátelo por WhatsApp: Otra opción práctica es enviarte el código QR por WhatsApp o cualquier otra app de mensajería que usés frecuentemente. Así, siempre lo tendrás accesible en tus mensajes.</ul>

        <p>Estamos aquí para apoyarte en cada paso de tu camino hacia el bienestar. No dudés en acercarte a nuestro equipo con cualquier pregunta o necesidad que tengás.</p>

        <p>¡Nos vemos en Kinetic, donde cada día es una oportunidad para celebrar el movimiento y la vida!</p>
        </div>`,
        attachments: [
          {
            filename: 'qr_code.png',
            content: qrData.buffer.toString('base64'),
          },
        ],
      });
    
      if (error) {
        return console.error({ error });
      }
    
      console.log({ data });
    })();
  }
}
