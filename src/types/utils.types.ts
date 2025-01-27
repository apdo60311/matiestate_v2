export interface DatabaseColumn {
    type: string;
    nullable: boolean;
}

export interface DatabaseSchema {
    columns: {
      [key: string]: DatabaseColumn;
    };
  }
  
  export interface JsonSchemaType {
    type: string;
    format?: string;
  }
  
  export interface TokenData {
    [key: string]: any;
  }
  