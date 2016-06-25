import { RouterConfig } from '@angular/router';
import { AdminComponent, AdminEditComponent, AdminPanelComponent } from '../admin';

export const AdminRoutes: RouterConfig = [
    {
        path: 'admin',
        component: AdminComponent,
        children: [
            {
                path: '',
                component: AdminPanelComponent,
                redirectTo: 'leagues',
            },
            {
                path: ':table',
                component: AdminPanelComponent,
            },
            {
                path: ':table/edit/:id',
                component: AdminEditComponent
            }
        ]
    }
];