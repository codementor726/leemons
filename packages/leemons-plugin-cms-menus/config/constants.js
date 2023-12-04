const pluginName = 'plugins.cms-menus';

const permissions = [
  {
    permissionName: `${pluginName}.cms-menu`,
    actions: ['view', 'update', 'create', 'delete', 'admin'],
    localizationName: { es: 'CMS', en: 'CMS' },
  },
];


const mainMenuItem = [{      
  removed: false,
  item: {
    key: 'cms',
    iconSvg: '/public/cms-menus/menu-icon.svg',
    activeIconSvg: '/public/cms-menus/menu-icon.svg',
    label: {
      en: 'CMS',
    },
  },
  permissions: [
    {
      permissionName: `${pluginName}.cms-menu`,    
      actionNames: ['view',  'update', 'create', 'delete', 'admin'],
    },
  ],
}, {
  // Homepage
  removed: false,
  item: {
    parentKey: 'cms',
    key: 'cms.home',
    order: 0,
    url: '/cms-menus/?url=https://www.acourze.com/admin/home',
    label: {
      en: 'Home',
    },
  },
  permissions: [
    {
      permissionName: `${pluginName}.cms-menu`,
      actionNames: ['view',  'update', 'create', 'delete', 'admin'],
    },
  ],
},
{
  // About Us
  removed: false,
  item: {
    parentKey: 'cms',
    key: 'cms.aboutus',
    order: 0,
    url: '/cms-menus/?url=https://www.acourze.com/admin/aboutus',
    label: {
      en: 'About Us',
    },
  },
  permissions: [
    {
      permissionName: `${pluginName}.cms-menu`,
      actionNames: ['view',  'update', 'create', 'delete', 'admin'],
    },
  ],
},
{
  // Programmes
  removed: false,
  item: {
    parentKey: 'cms',
    key: 'cms.programmes',
    order: 0,
    url: '/cms-menus/?url=https://www.acourze.com/admin/programmes',
    label: {
      en: 'Programmes',
    },
  },
  permissions: [
    {
      permissionName: `${pluginName}.cms-menu`,
      actionNames: ['view',  'update', 'create', 'delete', 'admin'],
    },
  ],
},
{
  // Contact Us
  removed: false,
  item: {
    parentKey: 'cms',
    key: 'cms.contact',
    order: 0,
    url: '/cms-menus/?url=https://www.acourze.com/admin/contactus',
    label: {
      en: 'Contact Us',
    },
  },
  permissions: [
    {
      permissionName: `${pluginName}.cms-menu`,
      actionNames: ['view',  'update', 'create', 'delete', 'admin'],
    },
  ],
}];

/* const subMenuItems = [
  {
    // Homepage
    item: {
      parentKey: 'cms',
      key: 'cms.home',
      order: 0,
      url: 'https://www.acourze.com/admin/home',
      label: {
        en: 'Home',
      },
    },
    permissions: [
      {
        permission: permissionNames.library,
        actionNames: ['view'],
      },
    ],
  },
  {
    // About Us
    item: {
      parentKey: 'cms',
      key: 'cms.aboutus',
      order: 0,
      url: 'https://www.acourze.com/admin/aboutus',
      label: {
        en: 'About Us',
      },
    },
    permissions: [
      {
        permission: permissionNames.library,
        actionNames: ['view'],
      },
    ],
  },
  {
    // Programmes
    item: {
      parentKey: 'cms',
      key: 'cms.programmes',
      order: 0,
      url: 'https://www.acourze.com/admin/programmes',
      label: {
        en: 'Programmes',
      },
    },
    permissions: [
      {
        permission: permissionNames.library,
        actionNames: ['view'],
      },
    ],
  },
  {
    // Contact Us
    item: {
      parentKey: 'cms',
      key: 'cms.contact',
      order: 0,
      url: 'https://www.acourze.com/admin/contactus',
      label: {
        en: 'Contact Us',
      },
    },
    permissions: [
      {
        permission: permissionNames.library,
        actionNames: ['view'],
      },
    ],
  },
]; */

const widgets = {
  zones: [{ key: `${pluginName}.admin.config-providers` }],
  items: [
    {
      zoneKey: `plugins.admin.admin-page`,
      key: `${pluginName}.admin.config`,
      url: 'admin-config/index',
      properties: {
        card: {
          headerColor: '#EEEAF7',
          title: `${pluginName}.admin.card.title`,
          image: '',
          imageWidth: 0,
          imageHeight: 0,
          description: `${pluginName}.admin.card.description`,
        },
      },
    },
  ],
};

module.exports = { mainMenuItem, widgets, permissions };
