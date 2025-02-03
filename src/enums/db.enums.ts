enum Status{
    ACTIVE=1,
    INACTIVE = 2
  }
  
  enum Role{
    USER=1,
    MANAGER = 2,
    ADMIN = 3,
  
  }
  
  enum UserType {
      CUSTOMER = 1,
      WORKER = 2,
      OTHER = 3,
  }
  
  enum ServiceType {
    MAINTENANCE = 0,
    OTHER = 1
  }
  
  enum BillType {
      PURCHASE = 1,
      SALE = 2,
      OTHER = 3
  }
  
  enum ContractType {
    RENTAL = 1,
    SALE= 2
  }
  
  enum AssetsType {
    REAL_ESTATE = 1,
    OTHER = 2,
  }
  enum FlatType{
    APARTMENT=1,
    LAND=2,
    PARKING=3,
    SHOP=4,
    VILLA = 5
  }
  
  enum PaidType{
    CASH = 1,
    CHEQUE = 2,
    OTHER = 3
  }
  enum PropertyType{
     APARTMENT=1,
    SHOP=2,
   PARKING = 3
  }
  
  enum ChequePaperType{
    ORIGINAL = 1,
    COPY = 2,
  }
  
  enum ChequeType{
      OUTGOING=1,
      INCOMING=2
  }
  enum ChequeConnectWith{
    NONE = 1,
      CONTRACT = 2,
      OTHER = 3
  }
  enum ConnectWith{
      NONE = 1,
      SELLER = 2,
      ACCOUNTING_VOUCHER = 3
  }
  enum VoucherType{
    JOURNAL_VOUCHER = 1,
    PAYMENT_VOUCHER=2,
    RECEIPT_VOUCHER=3
  }
  enum ServiceStatusCode{
    PENDING=1,
      INPROGRESS = 2,
      COMPLETED= 3,
      REJECTED= 4,
      CANCELED = 5,
      ONHOLD = 6,
      PAUSED = 7,
      OVERDUE = 8
  }
  enum WorkerStatusCode{
    PENDING=1,
      INPROGRESS = 2,
      COMPLETED= 3
  }
  enum ParkingKind{
    REGULAR = 1,
    VISITOR = 2
  }
  enum ShopKind{
    RETAIL=1,
    OFFICE=2
  }
  enum  LandType{
    FREEHOLD=1,
    LEASEHOLD=2,
  }
  