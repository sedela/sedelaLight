export class Document {
    _id: string;
    _rev: string;
    id_document: string;
    document_content: any;
    document_comments: any ;
    date_created: any;
    last_date_modified: any = new Date();
    //document_version: string;
}


export class Comment {
    comment_author: string;
    date_posted: any = Date.now;
    content: string;
}