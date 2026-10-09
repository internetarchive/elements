/* eslint-disable @typescript-eslint/no-explicit-any */
import { SearchParams } from './search-params';
import { ItemHit } from './models/hit-types/item-hit';
import { TextHit } from './models/hit-types/text-hit';

export class MockResponseGenerator {
  generateMockMetadataSearchResponse(
    params: SearchParams,
  ): Record<string, any> {
    const metadata1 = new ItemHit({ identifier: 'foo' });
    const metadata2 = new ItemHit({ identifier: 'bar' });

    return {
      rawResponse: {
        foo: 'bar',
      },
      request: {
        client_parameters: {
          client: 'page_production_service_endpoint',
          user_query: params.query,
          page: params.page ?? 0,
          hits_per_page: params.rows ?? 0,
          fields: params.fields ?? [],
        },
        backend_requests: {
          primary: {
            finalized_parameters: {
              client: 'page_production_service_endpoint',
              user_query: params.query,
              service_backend: 'metadata',
              page: params.page ?? 0,
              page_type: 'search_results',
              hits_per_page: 50,
              fields: ['_tile_'].concat(params.fields ?? []),
              sort: ['_score'],
              aggregations: [
                'mediatype',
                'year',
                'subject',
                'collection',
                'creator',
                'language',
              ],
              aggregations_size: 6,
            },
          },
        },
      },
      responseHeader: {
        succeeded: true,
        query_time: 3133,
      },
      response: {
        totalResults: 12345,
        returnedCount: 2,
        results: [metadata1, metadata2],
        schema: {
          hit_type: 'item',
          field_properties: {},
        },
      },
    };
  }

  generateMockFulltextSearchResponse(
    params: SearchParams,
  ): Record<string, any> {
    const text1 = new TextHit({ identifier: 'foo' });
    const text2 = new TextHit({ identifier: 'bar' });

    return {
      rawResponse: {
        foo: 'bar',
      },
      request: {
        client_parameters: {
          client: 'page_production_service_endpoint',
          user_query: params.query,
          page: params.page ?? 0,
          hits_per_page: params.rows ?? 0,
          fields: params.fields ?? [],
        },
        backend_requests: {
          primary: {
            finalized_parameters: {
              client: 'page_production_service_endpoint',
              user_query: params.query,
              service_backend: 'fts',
              page: params.page ?? 0,
              page_type: 'search_results',
              hits_per_page: 50,
              fields: ['_tile_'].concat(params.fields ?? []),
              sort: ['_score'],
              aggregations: [
                'mediatype',
                'year',
                'subject',
                'collection',
                'creator',
                'language',
              ],
              aggregations_size: 6,
            },
          },
        },
      },
      responseHeader: {
        succeeded: true,
        query_time: 3133,
      },
      response: {
        totalResults: 12345,
        returnedCount: 2,
        results: [text1, text2],
        schema: {
          hit_type: 'text',
          field_properties: {},
        },
      },
    };
  }

  generateMockItemDetailsResponse(): Record<string, any> {
    return {
      version: '1v2',
      session_context: {
        session_key: 'user__jasonb@archive.org',
        created: '2025-09-10T20:36:25Z',
        client_characterization: {
          characterized_by: 'asserted_or_authenticated',
          preferred_client_ip: null,
          client_ip: '207.241.239.247:sra',
          preferred_client_useragent: null,
          client_useragent:
            'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/18.6 Safari/605.1.15:sua',
          preferred_client_id: null,
          client_id: 'jasonb@archive.org:sco',
          preferred_client_jurisdiction: null,
          client_jurisdiction: 'US',
          actionable_jurisdiction: 'US',
          application_id: 'pageproduction',
          primary_session_application_id: 'pageproduction',
        },
        username: 'jasonb@archive.org',
        authentication_method: 'cookie',
        is_system: false,
        is_guest: false,
        is_user: true,
        is_archive_user: true,
        is_qualified: true,
        is_archivist: true,
        has_universal_privs: true,
        has_collection_priv: false,
        has_allowed_host_priv: true,
        has_vpn_host_priv: true,
        has_scan_center_priv: false,
        has_any_priv: true,
        has_any_priv_permissive: true,
        pps: {
          is_page_target_owner: false,
          full_text_search_override: true,
        },
        pps_relevant_user_preferences: {
          display__blur_moderated_content: 'on',
        },
      },
      request: {
        client_request_parameters: {
          client: 'page_production_service_endpoint',
          page_type: 'item_details',
          page_target: 'gd1972-08-25.sbd.miller.92840.sbeok.flac16',
        },
        backend_requests: {
          item_info: {
            root: '(self)',
            request_type: 'item_info',
            finalized_parameters: {
              page_type: 'item_info',
              page_target: 'gd1972-08-25.sbd.miller.92840.sbeok.flac16',
              service_backend: 'eic',
              caching: null,
            },
          },
        },
      },
      caching: {
        item_info: {
          name: 'PPS-1v2-J:US-RT:ii-T:ii-PT:34d6c9da',
          acceptable_names: [],
          configuration: {
            requested: [],
            finalized: {
              bypass: false,
              recompute: false,
              no_compute: false,
              ttl_s: 300,
              max_age_s: 0,
              miss_policy: 'none',
            },
          },
          utilization: {
            went_to_cache: true,
            alternates_allowed: true,
            hit_alternate: false,
            hit_canonical: false,
            hit: false,
            miss: true,
            recomputed: true,
            stored: true,
            elapsed_s: 0.23376107215881348,
          },
          statsd_bucket: 'search.pps.cache.unknown_backend.item_details',
        },
        summary: {
          fetched: [],
          computed: ['PPS-1v2-J:US-RT:ii-T:ii-PT:34d6c9da'],
          stored: ['PPS-1v2-J:US-RT:ii-T:ii-PT:34d6c9da'],
          missed: ['PPS-1v2-J:US-RT:ii-T:ii-PT:34d6c9da'],
          bypassed: [],
        },
      },
      elapsed_secs: 0.2482919692993164,
      response: {
        header: {
          succeeded: true,
          forensics: {
            method_profilers: [
              '[PROFILER][method][SearchEngineIndex::get_document_for_id][14.19][SUCCEEDED][at::2025-09-10T20:36:25Z; FETCH of; gd1972-08-25.sbd.miller.92840.sbeok.flac16]',
              '[PROFILER][method][SearchEngineIndex::get_by_querystring][162.95][SUCCEEDED][at::2025-09-10T20:36:25Z; COUNT of; collection:gd1972-08-25.sbd.miller.92840.sbeok.flac16 AND reviewdate:[2000 TO 2100]]',
              '[PROFILER][method][ItemAssistant::get_account_details_for][0.99][SUCCEEDED][at::2025-09-10T20:36:25Z; FETCH ACCOUNT for; mve...com]',
            ],
            field_value_sources: {
              item_level_search_document_fields: 'computed',
              thumbnail_url: 'computed',
              review_count: 'computed',
              uploader_details: 'computed',
              public_metadata: 'computed',
              reviews_metadata: 'computed',
            },
            metadata_computed_date: '(unavailable)',
            search_doc_created_date: '2025-08-25T19:17:25Z',
            backend_request_elapsed_secs: {
              item_info: 0.23376107215881348,
            },
          },
          elapsed_secs_for_backend_requests: 0.23376107215881348,
        },
        body: {
          extra_info: {
            item_size: 1094661875,
            files_count: 152,
            month: 1870,
            week: 1783,
            downloads: 64578,
            num_favorites: 124,
            title_message: null,
            primary_collection: 'GratefulDead',
            thumbnail_url:
              'https://ia800302.us.archive.org/27/items/gd1972-08-25.sbd.miller.92840.sbeok.flac16/__ia_thumb.jpg',
            review_count: 0,
            uploader_details: {
              screen_name: 'Matthew Vernon',
              useritem: '@matthew_vernon',
              is_archivist: true,
            },
            public_metadata: {
              identifier: 'gd1972-08-25.sbd.miller.92840.sbeok.flac16',
              title:
                'Grateful Dead Live at Berkeley Community Theatre on 1972-08-25',
              creator: 'Grateful Dead',
              mediatype: 'etree',
              collection: ['GratefulDead', 'etree', 'stream_only'],
              type: 'sound',
              description:
                "Set 1\n\nCold Rain And Snow  \nBlack Throated Wind  \nHe's Gone   \nBeat It On Down The Line  \nLoser  \nThe Frozen Logger \n\nEl Paso  \nBlack Peter \nJack Straw \nFriend Of The Devil \nThe Promised Land \nBird Song \nPlaying In The Band \nBertha \n\nSet 2\n\nTruckin' ->\nJam ->\nThe Other One",
              date: '1972-08-25',
              year: '1972',
              subject: 'Soundboard;Charlie Miller',
              publicdate: '2008-07-16 23:46:59',
              addeddate: '2008-07-16 23:02:45',
              venue: 'Berkeley Community Theatre',
              coverage: 'Berkeley, CA',
              source: 'SBD -> Master Reel -> Dat (48k)',
              lineage:
                'Dat (Sony R500) -> VXPocket v2 -> Samplitude Professional v10.1 -> FLAC',
              transferer: 'Charlie Miller',
              runtime: '142:47.51',
              md5s: 'e849a379a6274cf01e27177c1aebbbf6 *gd72-08-25d1t01.flac\r\nf7b6c8145ab2a4ce5ba7838f15366b20 *gd72-08-25d1t02.flac\r\n7729610334ac7a52b86bbb45aff3a8ed *gd72-08-25d1t03.flac\r\necffc40e1a339cdde4c3e73e348d15b7 *gd72-08-25d1t04.flac\r\n5fbba921951d6d05fd75d8bca5a8b28e *gd72-08-25d1t05.flac\r\nf91fd2da189c38703a0a480c0eaf8a95 *gd72-08-25d1t06.flac\r\nddad59e79d5d4a5f20f00db81fe2792b *gd72-08-25d1t07.flac\r\nf83ad36cd2a6c438247eb3b92cf532b0 *gd72-08-25d1t08.flac\r\n88db21c823fc60faa5f8b3126ab79ba7 *gd72-08-25d1t09.flac\r\nf00b69a7c00800bed46d29c605c3bbf1 *gd72-08-25d1t10.flac\r\n77c331944b8a8fa67706b0c61375155f *gd72-08-25d1t11.flac\r\nddf039bc23073162186e36e1e8bdcd94 *gd72-08-25d1t12.flac\r\na52c53b1661b1296bcd92a575125f024 *gd72-08-25d2t01.flac\r\nc86c3099eaaff49ea0c8c541a1d89e12 *gd72-08-25d2t02.flac\r\n6e7293e83de49da29f1e559dcf3c0a09 *gd72-08-25d2t03.flac\r\n88f62f3babf1b1be74e07b4ac0fbbcaf *gd72-08-25d2t04.flac\r\n362759e3f3c442370c50ca38a9dbb5dc *gd72-08-25d2t05.flac\r\n38f0151bb7fbecdfb9a6ef711c786316 *gd72-08-25d2t06.flac',
              notes:
                'Notes:\n-- Disc change is seamless\n-- Thanks to Rob Eaton for lending me his Dats\n-- Set 2 tape runs out at the end of The Other One\n-- Bobby starts Weather Report Suite Prelude as Set 2 tape runs out',
              updatedate: '2008-07-16 23:49:48',
              updater: 'Matthew Vernon',
              backup_location: 'ia903602_6',
              'access-restricted-item': 'true',
            },
            part_of: ['GratefulDead', 'etree', 'stream_only'],
            reviews_metadata: [
              {
                reviewbody:
                  'let me be the first to thank charlie for this sicko update and the new songs as well:-)',
                reviewtitle: 'SICKO',
                reviewer: 'DarkStar1972',
                reviewdate: '2008-07-17 02:38:56',
                createdate: '2008-07-17 02:38:56',
                stars: '5',
              },
              {
                reviewbody:
                  "Wow! Best show of 1972, but I do not believe it. According to my own eyes, the only tape that exists in the Vault is the partial reel that has only half of the first set.\n\nRegardless, I vividly recall this as being my personal favorite show (that I attended) for many years. Listening to it now makes me shift my allegiances back again. Everybody raves about the 8-27 Veneta, and that's a great show, but I think this one is superior. Everything about the sound and performance depicts a band at total ease and in their most creative groove.\n\nI do not know the accuracy of the story, but supposedly there was a mixup. Bear was fresh out of prison and not completely up to snuff on the GD's protocol and procedure. Betty thought Bear was handling it and Bear thought that Betty was handling it and somehow, while packing up for the tour that afternoon, they forgot to include enough 2 track tape for the machines for that night.\n\nNow, I see this????? I don't believe it, unless Bear recorded it on his own machine and gave the tapes to Betty who threw them out and Rob Eaton came up with them? This mystery is in sore need of an explanation, but alas...\n\n'Twas a very special night for me. The tickets I got sat me directly next to Bear while he mixed the front of house. The man was in particularly good cheer that night and very cordial, and we chatted before, during (at break) and after the show about mixing sound. In that one night he taught me and showed me more about live audio mixing than I have learned in the past 35 years. What he taught me I still practice to salubrious result.\n\nThe band was well-rehearsed and firing on all cylinders. The acoustics were absolutely immaculate. Bear was \"the\" master at mixing and he got the vocals sounding at their very peak that night. You could hear every nuance of every syllable and the band sang harmony with extreme command.\n\nTimes have certainly changed and now when I go to a Dead-related show I go early, wait in line and dash to the mosh pit in front of stage, but, at the time, in 1972, I was 22 and sitting on top of the world. I was one of those mysterious Dead Heads who liked to sit down in an assigned seat. I was...",
                reviewtitle: 'Built For Comfort',
                reviewer: 'Evan  S.  Hunt',
                reviewdate: '2008-07-17 05:06:15',
                createdate: '2008-07-17 05:06:15',
                stars: '5',
              },
              {
                reviewbody:
                  "Ok - so - scannig the new new testament (deadbase) - the last time this song is slated as having been played was 10/21/71 and was only played 6 times total between 6-6-70 and 10-21-71. \nNow, far be it from me to criticize any tape or recording that people do here - it's all such wonderful work. But i am wondering why this set list- complete up til The Other One in Deadbase, has no mention whatsoever of the Frozen Logger being played here? \nAlso, at least on this version here, the source sounds quite different than the rest of the show. Its much quiter then the rest of the set. \nIs it possible this song does not belong to this set list? \n\nOm a side note - a song i barely ever consider giving much mention to - BIODTL- is pretty rockin on here. Love the banter before hand.",
                reviewtitle: 'frozen logger?',
                reviewer: 'secret8476',
                reviewdate: '2008-07-17 15:40:47',
                createdate: '2008-07-17 15:40:47',
                stars: '4',
              },
              {
                reviewbody:
                  "What an amazing find... if Eric's comments below are accurate, this is truly some long lost gem (i don't know the history).\n\nThis source sounds incredible, period.  There are some minor crackles here and there but overall it's full and balanced... its like Jerry is singing into my ear through my headphones.  Incredible stuff! If you haven't already, head to the torrent sites and pick up the lossless version.  Well worth the hard drive space!",
                reviewtitle: 'Sounds amazing!',
                reviewer: 'Dr.Unclear',
                reviewdate: '2008-07-18 20:47:09',
                createdate: '2008-07-18 20:47:09',
                stars: '5',
              },
              {
                reviewbody:
                  'I, too, had an Owsley encounter at this show because he got me in free backstage. I was working in the Federal Halfway House where he came fresh outta the joint because I had refused induction and was doing two years of alternate service.\n\nWonderful to relive this night, the conclusion of a great run and the show before the famous one in Oregon. Nice to have more of it surface and then get the CM treatment!',
                reviewtitle: 'Lovely sounding recording!',
                reviewer: 'spinyn',
                reviewdate: '2008-07-18 21:05:31',
                createdate: '2008-07-18 21:05:31',
                stars: '5',
              },
            ],
          },
        },
        hit_schema: [],
      },
    };
  }
}
