import { msg } from '@lit/localize';
import { IATopNavConfig, IATopNavMenuConfig } from '../models';

export const defaultTopNavConfig: IATopNavConfig = {
  // Google Analytics event category
  eventCategory: 'TopNav',
};

/**
 * Creates archive.org top navigation configuration
 * @param { string } userid archive.org account (immutable) userid
 * @param { string } baseHost prefixed to every archive.org link. Pass '' for
 *                            links relative to the current host.
 * @param { string } itemIdentifier The current item being viewed, to populate admin menu items
 * @param { string } uploader email of the item's uploader, for the uploader admin section
 * @param { string } biblio biblio URL for a texts item, for the biblio admin section
 * @returns { object }
 */
export function buildTopNavMenus(
  userid: string = '',
  baseHost: string = 'https://archive.org',
  itemIdentifier: string = '',
  uploader: string = '',
  biblio: string = '',
): IATopNavMenuConfig {
  return {
    audio: {
      heading: msg('Internet Archive Audio'),
      iconLinks: [
        {
          icon: `${baseHost}/services/img/etree`,
          title: 'Live Music Archive',
          url: `${baseHost}/details/etree`,
        },
        {
          icon: `${baseHost}/services/img/librivoxaudio`,
          title: msg('Librivox Free Audio'),
          key: 'Librivox Free Audio',
          url: `${baseHost}/details/librivoxaudio`,
        },
      ],
      featuredLinks: [
        {
          title: msg('All Audio'),
          key: 'All Audio',
          url: `${baseHost}/details/audio`,
        },
        {
          title: 'Grateful Dead',
          url: `${baseHost}/details/GratefulDead`,
        },
        {
          title: 'Netlabels',
          url: `${baseHost}/details/netlabels`,
        },
        {
          title: msg('Old Time Radio'),
          key: 'Old Time Radio',
          url: `${baseHost}/details/oldtimeradio`,
        },
        {
          title: msg('78 RPMs and Cylinder Recordings'),
          key: '78 RPMs and Cylinder Recordings',
          url: `${baseHost}/details/78rpm`,
        },
      ],
      links: [
        {
          title: msg('Audio Books & Poetry'),
          key: 'Audio Books & Poetry',
          url: `${baseHost}/details/audio_bookspoetry`,
        },
        {
          title: msg('Computers, Technology and Science'),
          key: 'Computers, Technology and Science',
          url: `${baseHost}/details/audio_tech`,
        },
        {
          title: msg('Music, Arts & Culture'),
          key: 'Music, Arts & Culture',
          url: `${baseHost}/details/audio_music`,
        },
        {
          title: msg('News & Public Affairs'),
          key: 'News & Public Affairs',
          url: `${baseHost}/details/audio_news`,
        },
        {
          title: msg('Spirituality & Religion'),
          key: 'Spirituality & Religion',
          url: `${baseHost}/details/audio_religion`,
        },
        {
          title: msg('Podcasts'),
          key: 'Podcasts',
          url: `${baseHost}/details/podcasts`,
        },
        {
          title: msg('Radio News Archive'),
          key: 'Radio News Archive',
          url: `${baseHost}/details/radio`,
        },
      ],
      mobileAppsLinks: [],
      browserExtensionsLinks: [],
      archiveItLinks: [],
    },
    images: {
      heading: msg('Images'),
      iconLinks: [
        {
          icon: `${baseHost}/services/img/metropolitanmuseumofart-gallery`,
          title: 'Metropolitan Museum',
          url: `${baseHost}/details/metropolitanmuseumofart-gallery`,
        },
        {
          icon: `${baseHost}/services/img/clevelandart`,
          title: 'Cleveland Museum of Art',
          url: `${baseHost}/details/clevelandart`,
        },
      ],
      featuredLinks: [
        {
          title: msg('All Images'),
          key: 'All Images',
          url: `${baseHost}/details/image`,
        },
        {
          title: 'Flickr Commons',
          url: `${baseHost}/details/flickrcommons`,
        },
        {
          title: 'Occupy Wall Street Flickr',
          url: `${baseHost}/details/flickr-ows`,
        },
        {
          title: msg('Cover Art'),
          key: 'Cover Art',
          url: `${baseHost}/details/coverartarchive`,
        },
        {
          title: 'USGS Maps',
          url: `${baseHost}/details/maps_usgs`,
        },
      ],
      links: [
        {
          title: 'NASA Images',
          url: `${baseHost}/details/nasa`,
        },
        {
          title: msg('Solar System Collection'),
          key: 'Solar System Collection',
          url: `${baseHost}/details/solarsystemcollection`,
        },
        {
          title: 'Ames Research Center',
          url: `${baseHost}/details/amesresearchcenterimagelibrary`,
        },
      ],
      mobileAppsLinks: [],
      browserExtensionsLinks: [],
      archiveItLinks: [],
    },
    more: {
      links: [
        {
          title: msg('About'),
          key: 'About',
          url: `${baseHost}/about/`,
        },
        {
          title: msg('Blog'),
          key: 'Blog',
          url: 'https://blog.archive.org',
        },
        {
          title: msg('Events'),
          key: 'Events',
          url: `${baseHost}/events`,
        },
        {
          title: msg('Projects'),
          key: 'Projects',
          url: `${baseHost}/projects/`,
        },
        {
          title: msg('Help'),
          key: 'Help',
          url: `${baseHost}/about/faqs.php`,
        },
        {
          title: msg('Donate'),
          key: 'Donate',
          url: `${baseHost}/donate?origin=iawww-TopNavDonateButton`,
        },
        {
          title: msg('Contact'),
          key: 'Contact',
          url: `${baseHost}/about/contact`,
        },
        {
          title: msg('Jobs'),
          key: 'Jobs',
          url: `${baseHost}/about/jobs`,
        },
        {
          title: msg('Volunteer'),
          key: 'Volunteer',
          url: `${baseHost}/about/volunteer-positions`,
        },
      ],
      heading: '',
      iconLinks: [],
      featuredLinks: [],
      mobileAppsLinks: [],
      browserExtensionsLinks: [],
      archiveItLinks: [],
    },
    software: {
      heading: msg('Software'),
      iconLinks: [
        {
          icon: `${baseHost}/services/img/internetarcade`,
          title: 'Internet Arcade',
          url: `${baseHost}/details/internetarcade`,
        },
        {
          icon: `${baseHost}/services/img/consolelivingroom`,
          title: 'Console Living Room',
          url: `${baseHost}/details/consolelivingroom`,
        },
      ],
      featuredLinks: [
        {
          title: msg('All Software'),
          key: 'All Software',
          url: `${baseHost}/details/software`,
        },
        {
          title: msg('Old School Emulation'),
          key: 'Old School Emulation',
          url: `${baseHost}/details/tosec`,
        },
        {
          title: 'MS-DOS Games',
          url: `${baseHost}/details/softwarelibrary_msdos_games`,
        },
        {
          title: msg('Historical Software'),
          key: 'Historical Software',
          url: `${baseHost}/details/historicalsoftware`,
        },
        {
          title: msg('Classic PC Games'),
          key: 'Classic PC Games',
          url: `${baseHost}/details/classicpcgames`,
        },
        {
          title: msg('Software Library'),
          key: 'Software Library',
          url: `${baseHost}/details/softwarelibrary`,
        },
      ],
      links: [
        {
          title: 'Kodi Archive and Support File',
          url: `${baseHost}/details/kodi_archive`,
        },
        {
          title: msg('Vintage Software'),
          key: 'Vintage Software',
          url: `${baseHost}/details/vintagesoftware`,
        },
        {
          title: 'APK',
          url: `${baseHost}/details/apkarchive`,
        },
        {
          title: 'MS-DOS',
          url: `${baseHost}/details/softwarelibrary_msdos`,
        },
        {
          title: msg('CD-ROM Software'),
          key: 'CD-ROM Software',
          url: `${baseHost}/details/cd-roms`,
        },
        {
          title: 'CD-ROM Software Library',
          url: `${baseHost}/details/cdromsoftware`,
        },
        {
          title: msg('Software Sites'),
          key: 'Software Sites',
          url: `${baseHost}/details/softwaresites`,
        },
        {
          title: 'Tucows Software Library',
          url: `${baseHost}/details/tucows`,
        },
        {
          title: msg('Shareware CD-ROMs'),
          key: 'Shareware CD-ROMs',
          url: `${baseHost}/details/cdbbsarchive`,
        },
        {
          title: 'Software Capsules Compilation',
          url: `${baseHost}/details/softwarecapsules`,
        },
        {
          title: msg('CD-ROM Images'),
          key: 'CD-ROM Images',
          url: `${baseHost}/details/cdromimages`,
        },
        {
          title: 'ZX Spectrum',
          url: `${baseHost}/details/softwarelibrary_zx_spectrum`,
        },
        {
          title: 'DOOM Level CD',
          url: `${baseHost}/details/doom-cds`,
        },
      ],
      mobileAppsLinks: [],
      browserExtensionsLinks: [],
      archiveItLinks: [],
    },
    texts: {
      heading: msg('Texts'),
      iconLinks: [
        {
          title: 'Open Library',
          icon: `${baseHost}/images/widgetOL.png`,
          url: 'https://openlibrary.org/',
        },
        {
          title: msg('American Libraries'),
          key: 'American Libraries',
          icon: `${baseHost}/services/img/americana`,
          url: `${baseHost}/details/americana`,
        },
      ],
      featuredLinks: [
        {
          title: msg('All Texts'),
          key: 'All Texts',
          url: `${baseHost}/details/texts`,
        },
        {
          title: msg('Smithsonian Libraries'),
          key: 'Smithsonian Libraries',
          url: `${baseHost}/details/smithsonian`,
        },
        {
          title: 'FEDLINK (US)',
          url: `${baseHost}/details/fedlink`,
        },
        {
          title: msg('Genealogy'),
          key: 'Genealogy',
          url: `${baseHost}/details/genealogy`,
        },
        {
          title: 'Lincoln Collection',
          url: `${baseHost}/details/lincolncollection`,
        },
      ],
      links: [
        {
          title: msg('American Libraries'),
          key: 'American Libraries',
          url: `${baseHost}/details/americana`,
        },
        {
          title: msg('Canadian Libraries'),
          key: 'Canadian Libraries',
          url: `${baseHost}/details/toronto`,
        },
        {
          title: 'Universal Library',
          url: `${baseHost}/details/universallibrary`,
        },
        {
          title: 'Project Gutenberg',
          url: `${baseHost}/details/gutenberg`,
        },
        {
          title: msg("Children's Library"),
          key: "Children's Library",
          url: `${baseHost}/details/iacl`,
        },
        {
          title: 'Biodiversity Heritage Library',
          url: `${baseHost}/details/biodiversity`,
        },
        {
          title: msg('Books by Language'),
          key: 'Books by Language',
          url: `${baseHost}/details/booksbylanguage`,
        },
        {
          title: 'Folkscanomy',
          url: `${baseHost}/details/folkscanomy`,
        },
        {
          title: msg('Government Documents'),
          key: 'Government Documents',
          url: `${baseHost}/details/government-documents`,
        },
      ],
      mobileAppsLinks: [],
      browserExtensionsLinks: [],
      archiveItLinks: [],
    },
    web: {
      mobileAppsLinks: [
        {
          url: 'https://apps.apple.com/us/app/wayback-machine/id1201888313',
          title: 'Wayback Machine (iOS)',
          external: true,
        },
        {
          url: 'https://play.google.com/store/apps/details?id=com.internetarchive.waybackmachine',
          title: 'Wayback Machine (Android)',
          external: true,
        },
      ],
      browserExtensionsLinks: [
        {
          url: 'https://chrome.google.com/webstore/detail/wayback-machine/fpnmgdkabkmnadcjpehmlllkndpkmiak',
          title: 'Chrome',
          external: true,
        },
        {
          url: 'https://addons.mozilla.org/en-US/firefox/addon/wayback-machine_new/',
          title: 'Firefox',
          external: true,
        },
        {
          url: 'https://apps.apple.com/us/app/wayback-machine/id1472432422?mt=12',
          title: 'Safari',
          external: true,
        },
        {
          url: 'https://microsoftedge.microsoft.com/addons/detail/wayback-machine/kjmickeoogghaimmomagaghnogelpcpn?hl=en-US',
          title: 'Edge',
          external: true,
        },
      ],
      archiveItLinks: [
        {
          url: 'https://www.archive-it.org/explore',
          title: msg('Explore the Collections'),
          key: 'Explore the Collections',
          external: true,
        },
        {
          url: 'https://www.archive-it.org/blog/learn-more/',
          title: msg('Learn More'),
          key: 'Learn More',
          external: true,
        },
        {
          url: 'https://www.archive-it.org/contact-us',
          title: msg('Build Collections'),
          key: 'Build Collections',
          external: true,
        },
      ],
      heading: '',
      iconLinks: [],
      featuredLinks: [],
      links: [],
    },
    video: {
      heading: msg('Video'),
      iconLinks: [
        {
          icon: `${baseHost}/services/img/tv`,
          title: msg('TV News'),
          key: 'TV News',
          url: `${baseHost}/details/tv`,
        },
        {
          icon: `${baseHost}/services/img/911`,
          title: msg('Understanding 9/11'),
          key: 'Understanding 9/11',
          url: `${baseHost}/details/911`,
        },
      ],
      featuredLinks: [
        {
          title: msg('All Video'),
          key: 'All Video',
          url: `${baseHost}/details/movies`,
        },
        {
          title: 'Prelinger Archives',
          url: `${baseHost}/details/prelinger`,
        },
        {
          title: 'Democracy Now!',
          url: `${baseHost}/details/democracy_now_vid`,
        },
        {
          title: 'Occupy Wall Street',
          url: `${baseHost}/details/occupywallstreet`,
        },
        {
          title: 'TV NSA Clip Library',
          url: `${baseHost}/details/nsa`,
        },
      ],
      links: [
        {
          title: msg('Animation & Cartoons'),
          key: 'Animation & Cartoons',
          url: `${baseHost}/details/animationandcartoons`,
        },
        {
          title: msg('Arts & Music'),
          key: 'Arts & Music',
          url: `${baseHost}/details/artsandmusicvideos`,
        },
        {
          title: msg('Computers & Technology'),
          key: 'Computers & Technology',
          url: `${baseHost}/details/computersandtechvideos`,
        },
        {
          title: msg('Cultural & Academic Films'),
          key: 'Cultural & Academic Films',
          url: `${baseHost}/details/culturalandacademicfilms`,
        },
        {
          title: msg('Ephemeral Films'),
          key: 'Ephemeral Films',
          url: `${baseHost}/details/ephemera`,
        },
        {
          title: msg('Movies'),
          key: 'Movies',
          url: `${baseHost}/details/moviesandfilms`,
        },
        {
          title: msg('News & Public Affairs'),
          key: 'News & Public Affairs',
          url: `${baseHost}/details/newsandpublicaffairs`,
        },
        {
          title: msg('Spirituality & Religion'),
          key: 'Spirituality & Religion',
          url: `${baseHost}/details/spiritualityandreligion`,
        },
        {
          title: msg('Sports Videos'),
          key: 'Sports Videos',
          url: `${baseHost}/details/sports`,
        },
        {
          title: msg('Television'),
          key: 'Television',
          url: `${baseHost}/details/television`,
        },
        {
          title: msg('Videogame Videos'),
          key: 'Videogame Videos',
          url: `${baseHost}/details/gamevideos`,
        },
        {
          title: msg('Vlogs'),
          key: 'Vlogs',
          url: `${baseHost}/details/vlogs`,
        },
        {
          title: msg('Youth Media'),
          key: 'Youth Media',
          url: `${baseHost}/details/youth_media`,
        },
      ],
      mobileAppsLinks: [],
      browserExtensionsLinks: [],
      archiveItLinks: [],
    },
    user: [
      {
        url: `${baseHost}/upload`,
        title: msg('Upload files'),
        key: 'Upload files',
        analyticsEvent: 'UserUpload',
        class: 'mobile-upload',
      },
      {
        url: `${baseHost}/details/@${userid}`,
        title: msg('My uploads'),
        key: 'My uploads',
        analyticsEvent: 'UserLibrary',
      },
      {
        url: `${baseHost}/details/@${userid}/loans`,
        title: msg('My loans'),
        key: 'My loans',
        analyticsEvent: 'UserLoans',
      },
      {
        url: `${baseHost}/details/@${userid}/favorites`,
        title: msg('My favorites'),
        key: 'My favorites',
        analyticsEvent: 'UserFavorites',
      },
      {
        url: `${baseHost}/details/@${userid}/lists`,
        title: msg('My lists'),
        key: 'My lists',
        analyticsEvent: 'UserLists',
      },
      {
        url: `${baseHost}/details/@${userid}/collections`,
        title: msg('My collections'),
        key: 'My collections',
        analyticsEvent: 'UserCollections',
      },
      {
        url: `${baseHost}/details/@${userid}/web-archive`,
        title: msg('My web archives'),
        key: 'My web archives',
        analyticsEvent: 'UserWebArchive',
      },
      {
        url: `${baseHost}/account/settings`,
        title: msg('Account settings'),
        key: 'Account settings',
        analyticsEvent: 'UserSettings',
      },
      {
        url: 'https://help.archive.org',
        title: msg('Get help'),
        key: 'Get help',
        analyticsEvent: 'UserHelp',
      },
      {
        url: `${baseHost}/logout`,
        title: msg('Log out'),
        key: 'Log out',
        analyticsEvent: 'UserLogOut',
      },
    ],
    userAdmin: [
      {
        title: 'ADMINS:',
      },
      {
        title: 'item:',
      },
      {
        url: `${baseHost}/editxml/${itemIdentifier}`,
        title: 'edit xml',
        analyticsEvent: 'AdminUserEditXML',
      },
      {
        url: `${baseHost}/edit.php?redir=1&identifier=${itemIdentifier}`,
        title: 'edit files',
        analyticsEvent: 'AdminUserEditFiles',
      },
      {
        url: `${baseHost}/download/${itemIdentifier}/`,
        title: 'download',
        analyticsEvent: 'AdminUserDownload',
      },
      {
        url: `${baseHost}/metadata/${itemIdentifier}/`,
        title: 'metadata',
        analyticsEvent: 'AdminUserMetadata',
      },
      {
        url: `https://catalogd.archive.org/history/${itemIdentifier}`,
        title: 'history',
        analyticsEvent: 'AdminUserHistory',
      },
      {
        url: `${baseHost}/manage/${itemIdentifier}`,
        title: 'manage',
        analyticsEvent: 'AdminUserManager',
      },
      {
        url: `${baseHost}/manage/${itemIdentifier}#make_dark`,
        title: 'curate',
        analyticsEvent: 'AdminUserCurate',
      },
      {
        url: `${baseHost}/manage/${itemIdentifier}#modify_xml`,
        title: 'modify xml',
        analyticsEvent: 'AdminUserModifyXML',
      },
    ],
    userAdminFlags: [
      {
        url: `${baseHost}/services/flags/admin.php?identifier=${itemIdentifier}`,
        title: 'manage flags',
        analyticsEvent: 'AdminUserManageFlags',
      },
    ],
    userAdminBiblio: biblio
      ? [
          {
            url: `${biblio}&ignored=${itemIdentifier}`,
            title: 'biblio',
            analyticsEvent: 'AdminUserBiblio',
          },
          {
            url: `${baseHost}/bookview.php?mode=debug&identifier=${itemIdentifier}`,
            title: 'bookview',
            analyticsEvent: 'AdminUserBookView',
          },
          {
            url: `${baseHost}/download/${itemIdentifier}/format=Single Page Processed JP2 ZIP`,
            title: 'jp2 zip',
            analyticsEvent: 'AdminUserJP2Zip',
          },
        ]
      : [],
    userAdminUploader: uploader
      ? [
          {
            title: 'uploader:',
          },
          {
            title: uploader,
          },
          {
            url: `https://catalogd.archive.org/control/useradmin.php?email=${encodeURIComponent(uploader)}`,
            title: 'user admin',
            analyticsEvent: 'AdminUserUserAdmin',
          },
          {
            url: `https://catalogd.archive.org/control/setadmin.php?user=${encodeURIComponent(uploader)}&ignore=${itemIdentifier}`,
            title: 'user privs',
            analyticsEvent: 'AdminUserUserPrivs',
          },
        ]
      : [],
    signedOut: [
      {
        url: `${baseHost}/signup`,
        title: msg('Sign up for free'),
        key: 'Sign up for free',
        analyticsEvent: 'AvatarMenu-Signup',
      },
      {
        url: `${baseHost}/login`,
        title: msg('Log in'),
        key: 'Log in',
        analyticsEvent: 'AvatarMenu-Login',
      },
    ],
  };
}
