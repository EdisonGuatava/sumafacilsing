import { RouteInfo } from './horizontal-sidebar.metadata';

export const ROUTES: RouteInfo[] = [
    {
        path: '/starter',
        title: 'Starter',
        icon: 'home',
        class: '',
        ddclass: '',
        extralink: false,
        submenu: []
    },
    {
        path: '',
        title: 'UI',
        icon: 'grid',
        class: 'has-arrow',
        ddclass: 'mega-dropdown',
        extralink: false,
        submenu: [
            {
                path: '/component/accordion',
                title: 'Accordion',
                icon: 'mdi mdi-equal',
                class: '',
                ddclass: '',
                extralink: false,
                submenu: []
            },
            {
                path: '/component/alert',
                title: 'Alert',
                icon: 'mdi mdi-message-bulleted',
                class: '',
                ddclass: '',
                extralink: false,
                submenu: []
            },
            {
                path: '/component/carousel',
                title: 'Carousel',
                icon: 'mdi mdi-view-carousel',
                class: '',
                ddclass: '',
                extralink: false,
                submenu: []
            },
            {
                path: '/component/dropdown',
                title: 'Dropdown',
                icon: 'mdi mdi-arrange-bring-to-front',
                class: '',
                ddclass: '',
                extralink: false,
                submenu: []
            },
            {
                path: '/component/modal',
                title: 'Modal',
                icon: 'mdi mdi-tablet',
                class: '',
                ddclass: '',
                extralink: false,
                submenu: []
            },
            {
                path: '/component/pagination',
                title: 'Pagination',
                icon: 'mdi mdi-backburger',
                class: '',
                ddclass: '',
                extralink: false,
                submenu: []
            },
            {
                path: '/component/poptool',
                title: 'Popover & Tooltip',
                icon: 'mdi mdi-image-filter-vintage',
                class: '',
                ddclass: '',
                extralink: false,
                submenu: []
            },
            {
                path: '/component/progressbar',
                title: 'Progressbar',
                icon: 'mdi mdi-poll',
                class: '',
                ddclass: '',
                extralink: false,
                submenu: []
            },
            {
                path: '/component/rating',
                title: 'Ratings',
                icon: 'mdi mdi-bandcamp',
                class: '',
                ddclass: '',
                extralink: false,
                submenu: []
            },
            {
                path: '/component/nav',
                title: 'Nav',
                icon: 'mdi mdi-sort-variant',
                class: '',
                ddclass: '',
                extralink: false,
                submenu: []
            },
            {
                path: '/component/timepicker',
                title: 'Timepicker',
                icon: 'mdi mdi-calendar-clock',
                class: '',
                ddclass: '',
                extralink: false,
                submenu: []
            },
            {
                path: '/component/buttons',
                title: 'Button',
                icon: 'mdi mdi-toggle-switch',
                class: '',
                ddclass: '',
                extralink: false,
                submenu: []
            },
            {
                path: '/component/notifier',
                title: 'Notifier',
                icon: 'mdi mdi-bandcamp',
                class: '',
                ddclass: '',
                extralink: false,
                submenu: []
            },
            {
                path: '/cards/basiccards',
                title: 'Basic Cards',
                icon: 'mdi mdi-layers',
                class: '',
                ddclass: '',
                extralink: false,
                submenu: []
            },
            {
                path: '/cards/customcards',
                title: 'Custom Cards',
                icon: 'mdi mdi-credit-card-scan',
                class: '',
                ddclass: '',
                extralink: false,
                submenu: []
            },
            {
                path: '/cards/weathercards',
                title: 'Weather Cards',
                icon: 'mdi mdi-weather-fog',
                class: '',
                ddclass: '',
                extralink: false,
                submenu: []
            },
            {
                path: '/extra-component/toastr',
                title: 'Toastr',
                icon: 'mdi mdi-poll',
                class: '',
                ddclass: '',
                extralink: false,
                submenu: []
            },
            {
                path: '/extra-component/editor',
                title: 'Editor',
                icon: 'mdi mdi-dns',
                class: '',
                ddclass: '',
                extralink: false,
                submenu: []
            },
            {
                path: '/extra-component/dragndrop',
                title: 'Drag n Drop',
                icon: 'mdi mdi-arrow-expand-all',
                class: '',
                ddclass: '',
                extralink: false,
                submenu: []
            },
            {
                path: '/widgets/apps',
                title: 'Widget Apps',
                icon: 'mdi mdi-comment-processing-outline',
                class: '',
                ddclass: '',
                extralink: false,
                submenu: []
            },
            {
                path: '/widgets/data',
                title: 'Widget Data',
                icon: 'mdi mdi-calendar',
                class: '',
                ddclass: '',
                extralink: false,
                submenu: []
            }
        ]
    },
    {
        path: '',
        title: 'DD',
        icon: 'align-left',
        class: 'has-arrow',
        ddclass: '',
        extralink: false,
        submenu: [
            {
                path: '',
                title: 'Second Level',
                icon: 'mdi mdi-octagram',
                class: '',
                ddclass: '',
                extralink: true,
                submenu: []
            },
            {
                path: '/second',
                title: 'Second Child',
                icon: 'mdi mdi-octagram',
                class: 'has-arrow',
                ddclass: '',
                extralink: false,
                submenu: [
                    {
                        path: '/thirdone',
                        title: 'Third 1.1',
                        icon: 'mdi mdi-playlist-plus',
                        class: '',
                        ddclass: '',
                        extralink: false,
                        submenu: []
                    },
                    {
                        path: '/thirdtwo',
                        title: 'Third 1.2',
                        icon: 'mdi mdi-playlist-plus',
                        class: '',
                        ddclass: '',
                        extralink: false,
                        submenu: []
                    }
                ]
            }
        ]
    }
];
