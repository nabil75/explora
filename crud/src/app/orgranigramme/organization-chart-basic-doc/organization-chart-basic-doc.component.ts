import { Component } from '@angular/core';
import { TreeNode, SharedModule } from 'primeng/api';
import { OrganizationChartModule } from 'primeng/organizationchart';


@Component({
    selector: 'organization-chart-basic-doc',
    templateUrl: './organization-chart-basic-doc.component.html',
    standalone: true,
    imports: [OrganizationChartModule, SharedModule],
})
export class OrganizationChartBasicDocComponent {

  selectedNodes!: TreeNode[];

    data: TreeNode[] = [
        {
            expanded: false,
            type: 'person',
            data: {
                image: 'https://primefaces.org/cdn/primeng/images/demo/avatar/amyelsner.png',
                name: 'Amy Elsner',
                title: 'CEO',
                age: '35 ans'
            },
            children: [
                {
                    expanded: false,
                    type: 'person',
                    data: {
                        image: 'https://primefaces.org/cdn/primeng/images/demo/avatar/annafali.png',
                        name: 'Anna Fali',
                        title: 'CMO',
                        age: '45 ans'
                    },
                    children: [
                        {
                            label: 'Sales',
                            children: [
                              {label:'Marketing'}
                            ]
                        },
                        {
                            label: 'Finances'
                        }
                    ]
                },
                {
                    expanded: true,
                    type: 'person',
                    data: {
                        image: 'https://primefaces.org/cdn/primeng/images/demo/avatar/stephenshaw.png',
                        name: 'Stephen Shaw',
                        title: 'CTO'
                    },
                    children: [
                        {
                            label: 'Development'
                        },
                        {
                            label: 'UI/UX Design'
                        }
                    ]
                }
            ]
        }
    ];

}