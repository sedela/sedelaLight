import { Component, ViewChild, ViewEncapsulation, OnInit, Injectable, Input, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

import Quill from 'quill';
import  ImageResize  from 'quill-image-resize-module';
import { ImageDrop } from 'quill-image-drop-module';

import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/distinctUntilChanged';

Quill.register('modules/imageResize', ImageResize);
Quill.register('modules/imageDrop', ImageDrop);

@Component({
  selector: 'app-model',
  template: `
        <quill-editor   [(ngModel)]="html" 
        [modules]="toolbarOptions"
        [theme] = "editor_theme"
        [style]="editor_style"
        [placeholder]="text_default"
        [readOnly]="isReadOnly"
        (onEditorCreated)="setFocus($event)"
        (onContentChanged)="logChange($event)"> 
         
      </quill-editor>
  `,
  styles: [],
  encapsulation: ViewEncapsulation.None
})


export class AppModelComponent {

  @Input() delta: any = 2;
  // htmlget: any = 2;
  deltasave: any;
  @Input() html: any = 2;
  @Output() htmlChange = new EventEmitter();
  @Output() deltaChange = new EventEmitter();
  @Input() editor_theme = 'snow';
  @Input() text_default = 'pour rédiger un nouveau document tapez votre texte ici...';
  
  @Input() editor_style = {
    height: '800px'
  }

  @Input() toolbarOptions: any = {
    toolbar: [
      [{ 'font': ['sans-serif', 'monospace', 'serif'] }],
      [{ 'size': ['small', false, 'large', 'huge'] }],
      [
        'bold',
        'italic',
        'underline',
        'strike'
      ],
      [{ 'color': [] }, { 'background': [] }],


      [{ 'header': [1, 2, 3, 4, 5, 6, false] }],

      

      [{ 'list': 'ordered' }, { 'list': 'bullet' }],
      [{ 'indent': '-1' }, { 'indent': '+1' }, { 'align': [] }],
      [{ 'direction': 'rtl' }],


      ['link', 'image'],
      ['clean']
    ],
    imageResize: true,
    imageDrop: true
  
  }



  @Input() isReadOnly = false;
  form: FormGroup;
  constructor(fb: FormBuilder) {
    this.form = fb.group({
      editor: ['test']
    });
  }

  // @ViewChild('Quill') quills: Quill
 // @ViewChild('editor') editor: QuillEditorComponent;
  // @ViewChild('AppComponent') appc: AppComponent

  // tslint:disable-next-line:use-life-cycle-interface
  ngOnInit() {
    this.form
      .controls
      .editor
      .valueChanges
      .debounceTime(400)
      .distinctUntilChanged()
      .subscribe(data => {
        console.log('native from Control value changes with debounce', data);
      });

    /*if (this.editor) {
      this.editor
        .onContentChanged.debounceTime(400)
        .distinctUntilChanged()
        .subscribe(data => {
          console.log('view child + directly subscription', data);
        });

      //console.log('modules quill :', this.editor.modules);

    }*/

  }

  setFocus($event) {
    $event.focus();
  }

  patchValue() {
    this.form.controls['editor'].patchValue(`${this.form.controls['editor'].value} patched!`);
  }


  toggleReadOnly() {
    this.isReadOnly = !this.isReadOnly;
  }

  logChange($event: any) {
    this.deltasave = $event.editor['editor'].delta;
    this.getDelta();
  }

  logSelection($event: any) {
    console.log($event);
  }

  getHTML() {
    this.html = this.html;
    this.htmlChange.emit({ value: this.html });

  }

  getDelta() {
    this.delta = this.deltasave;
    this.deltaChange.emit({ value: this.delta });
  }

}
