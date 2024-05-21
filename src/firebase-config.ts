import admin, { ServiceAccount } from 'firebase-admin';

export class FirebaseConfig {
  private static instance: FirebaseConfig;
  private digiGymApp: admin.app.App;
  private storage: admin.storage.Storage;

  static tenantsCollectionName = 'tenants';
  static membershipCollectionName = 'membership';
  static membershipTypeCollectionName = 'membershipType';
  static customerCollectionName = 'customer';
  static userCollectionName = 'user';
  static guestCustomerCollectionName = 'guestCustomer';
  static paymentCollectionName = 'payment';
  static attendanceCollectionName = 'attendance';
  static customerProgressCollectionName = 'customerProgress';

  private constructor() {}

  public static getInstance(): FirebaseConfig {
    if (!FirebaseConfig.instance) {
      FirebaseConfig.instance = new FirebaseConfig();
      const serviceAccount: ServiceAccount = {
        projectId: process.env.projectId,
        privateKey: process.env.privateKey.replace(/\\n/g, '\n'),
        clientEmail: process.env.clientEmail,
      };
      FirebaseConfig.instance.digiGymApp = admin.initializeApp(
        {
          credential: admin.credential.cert(serviceAccount),
          storageBucket: process.env.storageBucket,
        },
        'DIGI_GYM_APP',
      );
      FirebaseConfig.instance.storage = admin.storage(
        FirebaseConfig.instance.digiGymApp,
      );
    }
    return FirebaseConfig.instance;
  }

  public static get auth(): admin.auth.Auth {
    return FirebaseConfig.getInstance().digiGymApp.auth();
  }

  public static getMessaging() {
    return this.getInstance().digiGymApp.messaging();
  }

  public static firestore(): FirebaseFirestore.Firestore {
    return FirebaseConfig.getInstance().digiGymApp.firestore();
  }

  public static storage() {
    return FirebaseConfig.getInstance().storage;
  }

  static getFullPath = (tenant: string, collection: string) => {
    return (tenant ?? 'tenants/default') + '/' + collection;
  };

  public static tenantsCollection(
    path?: string,
  ): FirebaseFirestore.CollectionReference {
    return FirebaseConfig.firestore().collection(
      FirebaseConfig.getFullPath(path, FirebaseConfig.tenantsCollectionName),
    );
  }

  public static membershipCollection(
    path?: string,
  ): FirebaseFirestore.CollectionReference {
    return FirebaseConfig.firestore().collection(
      FirebaseConfig.getFullPath(path, FirebaseConfig.membershipCollectionName),
    );
  }

  public static membershipTypeCollection(
    path?: string,
  ): FirebaseFirestore.CollectionReference {
    return FirebaseConfig.firestore().collection(
      FirebaseConfig.getFullPath(
        path,
        FirebaseConfig.membershipTypeCollectionName,
      ),
    );
  }

  public static userCollection(
    path?: string,
  ): FirebaseFirestore.CollectionReference {
    return FirebaseConfig.firestore().collection(
      FirebaseConfig.getFullPath(path, FirebaseConfig.userCollectionName),
    );
  }

  public static guestCustomerCollection(
    path?: string,
  ): FirebaseFirestore.CollectionReference {
    return FirebaseConfig.firestore().collection(
      FirebaseConfig.getFullPath(
        path,
        FirebaseConfig.guestCustomerCollectionName,
      ),
    );
  }

  public static customerCollection(
    path?: string,
  ): FirebaseFirestore.CollectionReference {
    return FirebaseConfig.firestore().collection(
      FirebaseConfig.getFullPath(path, FirebaseConfig.customerCollectionName),
    );
  }

  public static paymentCollection(
    path?: string,
  ): FirebaseFirestore.CollectionReference {
    return FirebaseConfig.firestore().collection(
      FirebaseConfig.getFullPath(path, FirebaseConfig.paymentCollectionName),
    );
  }

  public static attendanceCollection(
    path?: string,
  ): FirebaseFirestore.CollectionReference {
    return FirebaseConfig.firestore().collection(
      FirebaseConfig.getFullPath(path, FirebaseConfig.attendanceCollectionName),
    );
  }

  public static customerProgressCollection(
    path?: string,
  ): FirebaseFirestore.CollectionReference {
    return FirebaseConfig.firestore().collection(
      FirebaseConfig.getFullPath(
        path,
        FirebaseConfig.customerProgressCollectionName,
      ),
    );
  }
}
