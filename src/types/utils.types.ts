interface DatabaseColumn {
    type: string;
    nullable: boolean;
}

interface DatabaseSchema {
    columns: {
      [key: string]: DatabaseColumn;
    };
  }
  
  interface JsonSchemaType {
    type: string;
    format?: string;
  }
  
  interface TokenData {
    [key: string]: any;
  }
  