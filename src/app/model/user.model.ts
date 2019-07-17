export interface User {
    _id: any;
    _rev:any;
    email: any;
    password: any;
    first_name: any;
    last_name: any;
    role: string;
    list_of_documents: any[];
    list_of_contacts: any[];

}

export interface NewUser {
    _id: any;
    email: any;
    password: any;
    first_name: any;
    last_name: any;
    role: string;
    list_of_documents: any[];
    list_of_contacts: any[];

}


export interface Contacts {
    contact_id: any;
    list_of_sharing_documents: any [];

}

export class Comments {
    comment_author: string;
    date_posted: any;
    comment_content: string;
}


