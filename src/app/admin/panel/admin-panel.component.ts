import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ApiService } from '../../services';
import { DynamicTableComponent } from '../../dynamic-tables';
import { AdminNavComponent } from '../nav';
import { Tables } from '../';
import { AdminEditMetadata } from './admin-edit.metadata';

@Component({
  selector: 'admin-panel',
  template: require('./admin-panel.component.html'),
  providers: [ApiService, AdminEditMetadata],
  directives: [DynamicTableComponent, AdminNavComponent],
  styles: []
})
export class AdminPanelComponent implements OnInit{

    private tableMap = Tables; // map for navigation
    private sub: any;
    private tableName: string; // name of active table
    private collection: any[]; // subscription results
    private tableTheme = "light-theme"; // dynamic table theme
    private activeEditing:boolean = true;
    private formQuestions: {}[];

    @ViewChild(DynamicTableComponent) dynamicTable: DynamicTableComponent;
    constructor(private route: ActivatedRoute, 
                private service: ApiService,
                private metadata: AdminEditMetadata
    ) {}
    ngOnInit () {
        this.sub = this.route.params.subscribe(params => {
            this.tableName = params['table']; 
            this.service.getData(this.tableName)
                .subscribe(data => {
                    this.collection = data;
                    this.dynamicTable.setData(data);
                }
            )
            if (this.activeEditing) {
                this.formQuestions = this.metadata.getQuestions(this.tableName);
            }
        })
    }
    ngOnDestroy() {
        this.sub.unsubscribe()
    }
}