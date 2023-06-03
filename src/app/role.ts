export interface Permission {
    id: number;
    name: string;
    checked : boolean;
  }
  
  export class Role {
    id!: number;
    name!: string;
    permissions!: Permission[];
  }