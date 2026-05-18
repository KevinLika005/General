import { en } from './en';

export const sq = {
  ...en,
  common: {
    ...en.common,
    language: {
      en: 'EN',
      sq: 'SQ',
      switcher: 'Përzgjedhësi i gjuhës',
      current: 'Gjuha aktuale: Shqip',
      toggle: 'Ndrysho gjuhën',
    },
    actions: {
      ...en.common.actions,
      search: 'Kërko',
      searchCatalog: 'Kërko në katalog',
      searchCategory: 'Kërko në kategori',
      searchAvailableStock: 'Kërko stokun e gatshëm',
      browse: 'Shfleto',
      browseCatalog: 'Shfleto katalogun',
      browseEquipment: 'Shfleto pajisjet',
      browseCategory: 'Shiko kategorinë',
      continueBrowsing: 'Vazhdo shfletimin',
      clear: 'Pastro',
      clearAll: 'Pastro të gjitha',
      clearFilters: 'Pastro filtrat',
      clearInquiryList: 'Pastro listën e kërkesave',
      applyFilters: 'Zbato filtrat',
      openList: 'Hap listën',
      requestQuote: 'Kërko ofertë',
      requestDocuments: 'Kërko dokumente',
      contactSales: 'Kontakto shitjet',
      contactSupport: 'Kontakto mbështetjen',
      goHome: 'Kthehu në krye',
      viewDetails: 'Shiko detajet',
      viewAvailableNow: 'Shiko stokun e gatshëm',
      resetCategoryFilters: 'Rivendos filtrat e kategorisë',
      startB2BRequest: 'Nis një kërkesë B2B',
      requestContractDiscussion: 'Kërko diskutim kontrate',
      submitRequest: 'Dërgo kërkesën',
      sendRequest: 'Dërgo kërkesën',
      getAlerts: 'Merr njoftime',
      reviewInquiryList: 'Rishiko listën e kërkesave',
      requestInfo: 'Kërko informacion',
    },
    labels: {
      ...en.common.labels,
      home: 'Kreu',
      equipment: 'Pajisje',
      breadcrumb: 'Gjurmë navigimi',
      primaryNavigation: 'Kryesore',
      filters: 'Filtra',
      filterResults: 'Filtro rezultatet',
      sort: 'Rendit',
      productGroups: 'Grupet e produkteve',
      supportLinks: 'Lidhje mbështetëse',
      company: 'Kompania',
      quantity: 'Sasia',
      location: 'Vendndodhja',
      priceMode: 'Mënyra e çmimit',
      view: 'Pamja',
      category: 'Kategoria',
      subcategory: 'Nënkategoria',
      productType: 'Lloji i produktit',
      brand: 'Marka',
      priceRange: 'Diapazoni i çmimit',
      year: 'Viti',
      yearFrom: 'Viti nga',
      yearTo: 'Viti deri',
      condition: 'Gjendja',
      availability: 'Disponueshmëria',
      operatingHoursUnder: 'Orë pune nën',
      mileageUnder: 'Kilometrazhi nën',
      tags: 'Etiketa',
      preferred: 'I preferuar',
      requestType: 'Lloji i kërkesës',
      preferredContact: 'Kontakti i preferuar',
      preferredContactMethod: 'Mënyra e preferuar e kontaktit',
      timeline: 'Afati',
      deliveryPreference: 'Preferenca e dorëzimit',
      message: 'Mesazhi',
      fullName: 'Emri i plotë',
      companyName: 'Emri i kompanisë',
      companyRole: 'Roli në kompani',
      vatNumber: 'NIPT / TVSH',
      email: 'Email',
      phone: 'Telefon',
      countryCity: 'Shteti / qyteti',
      cityCountry: 'Qyteti / shteti',
      businessHours: 'Orari i punës',
      address: 'Adresa',
      salesPhone: 'Telefoni i shitjeve',
      selectedProducts: 'Produktet e zgjedhura',
      technicalData: 'Të dhëna teknike',
      productNotesForRafin: 'Shënime për produktin për Rafin',
      documentRequest: 'Kërkesë dokumentesh',
      searchDocumentGroups: 'Kërko grupet e dokumenteve',
      technicalSpecifications: 'Specifikime teknike',
      technicalLibrary: 'Biblioteka teknike',
      inquiryAction: 'Veprimi i kërkesës',
    },
    status: {
      ...en.common.status,
      availableNow: 'I disponueshëm tani',
      reservedPendingContract: 'I rezervuar në pritje të kontratës',
      incomingStock: 'Stok në ardhje',
      soldReference: 'Referencë e shitur',
      new: 'I ri',
      used: 'I përdorur',
      refurbished: 'I rikondicionuar',
      deal: 'Ofertë',
      featured: 'Të veçuara',
      newest: 'Më të rejat',
      priceLowToHigh: 'Çmimi nga i ulëti te i larti',
      priceHighToLow: 'Çmimi nga i larti te i ulëti',
      yearNewest: 'Viti më i ri',
      hoursLowToHigh: 'Orët nga më të ulëtat te më të lartat',
      mileageLowToHigh: 'Kilometrazhi nga më i ulëti te më i larti',
      allStatus: 'Të gjitha statuset',
      allConditions: 'Të gjitha gjendjet',
      allCategories: 'Të gjitha kategoritë',
      allSubcategories: 'Të gjitha nënkategoritë',
      allProductTypes: 'Të gjitha llojet e produkteve',
      allBrands: 'Të gjitha markat',
      allPriceBands: 'Të gjitha diapazonet e çmimeve',
      allLocations: 'Të gjitha vendndodhjet',
      allTags: 'Të gjitha etiketat',
      available: 'I disponueshëm',
      incoming: 'Në ardhje',
      reserved: 'I rezervuar',
      sold: 'I shitur',
      gridView: 'Pamje me rrjetë',
      listView: 'Pamje me listë',
      priceOnRequest: 'Çmimi sipas kërkesës',
      startingFrom: 'Duke filluar nga {{value}}',
      warehouseItem: 'Artikull magazine',
      commercialDetailsOnRequest: 'Detaje komerciale sipas kërkesës',
      availableDuringInquiryReview: 'I disponueshëm gjatë shqyrtimit të kërkesës',
      confirmedDuringInquiry: 'Konfirmohet gjatë kërkesës',
      document: 'Dokument',
      openDocumentReference: 'Hap referencën e dokumentit',
      noOnlinePayment: 'Në këtë faqe nuk kryhet pagesë online ose marrëveshje automatike.',
      soldBanner: 'Referencë e shitur. Kërko një njësi të ngjashme.',
      reservedBanner: 'I rezervuar ndërsa kërkesa aktuale është në shqyrtim.',
      noCheckout: 'Kjo nuk është checkout.',
      itemCount: '{{count}} artikull(e)',
      requestedItems: '{{count}} artikull(e) të kërkuar(a)',
      productLines: '{{count}} rresht(a) produkti',
      results: '{{count}} rezultate',
      productsInView: '{{count}} produkte në pamje',
      matchingItems: '{{count}} artikuj që përputhen',
      listings: '{{count}} listime',
      qtyPrice: 'Sasia {{quantity}} | {{price}}',
      notesPrefix: 'Shënime: {{notes}}',
      searchChip: 'Kërkim: {{value}}',
      fromYear: 'Nga {{value}}',
      toYear: 'Deri {{value}}',
      hoursUnder: 'Orë nën {{value}}',
      mileageUnderValue: 'Kilometrazh nën {{value}}',
      unit: 'Njësia {{value}}',
      year: 'Viti {{value}}',
      placeholderGroup: 'Grup ilustrues',
    },
    accessibility: {
      ...en.common.accessibility,
      skipToMain: 'Kalo te përmbajtja kryesore',
      openInquirySummary: 'Hap përmbledhjen e listës së kërkesave',
      closeInquirySummary: 'Mbyll përmbledhjen e listës së kërkesave',
      inquirySummary: 'Përmbledhja e listës së kërkesave',
      searchCatalog: 'Kërko në katalog',
      openMobileNavigation: 'Hap navigimin celular',
      closeMobileMenu: 'Mbyll menunë celulare',
      mobileNavigation: 'Navigimi celular',
      openProductsMenu: 'Hap menunë e produkteve',
      openSolutionsMenu: 'Hap menunë e zgjidhjeve',
      openSupportMenu: 'Hap menunë e mbështetjes',
      closeFilters: 'Mbyll filtrat',
      removeProduct: 'Hiq {{product}}',
      viewProductImage: 'Shiko figurën e produktit {{index}} nga {{count}}',
      emailAddress: 'Adresa e emailit',
    },
    forms: {
      ...en.common.forms,
      chooseOne: 'Zgjidh një',
      immediate: 'Menjëherë',
      thisWeek: 'Këtë javë',
      oneToTwoWeeks: '1-2 javë',
      thisMonth: 'Këtë muaj',
      flexible: 'Fleksibël',
      pickup: 'Marrje në vend',
      localDelivery: 'Dorëzim lokal',
      exportShipping: 'Dërgesë eksporti',
      toBeDiscussed: 'Për t’u diskutuar',
      whatsapp: 'WhatsApp',
      contactByEmail: 'Email',
      contactByPhone: 'Telefon',
      productInformation: 'Kërko informacion',
      priceQuotation: 'Kërko ofertë',
      contractRequest: 'Kërko diskutim kontrate',
      documentRequest: 'Kërko dokumente',
      deliveryInspection: 'Dorëzim ose inspektim',
      requestInspection: 'Kërko inspektim',
    },
  },
  metadata: {
    ...en.metadata,
    home: {
      title: 'Rafin Machinery | Katalog teknik pajisjesh dhe kërkesa B2B',
      description:
        'Shfletoni makineri, kamionë, pjesë këmbimi, aksesorë dhe pajisje mbështetëse në një katalog teknik B2B të ndërtuar për kërkesa, oferta, inspektime dhe ndjekje kontratash.',
    },
    catalog: {
      title: 'Katalogu | Rafin Machinery',
      description:
        'Kërkoni në katalogun Rafin Machinery sipas kategorisë, nënkategorisë, llojit të produktit, markës, SKU-së, disponueshmërisë dhe mënyrës së çmimit në një ndërfaqe kompakte të fokusuar te kërkesat B2B.',
    },
    brands: {
      title: 'Markat | Rafin Machinery',
      description:
        'Shfletoni prodhuesit e përfaqësuar në inventarin aktual të Rafin Machinery dhe kaloni drejtpërdrejt te rezultatet e filtruara sipas markës.',
    },
    deals: {
      title: 'Stoku i gatshëm dhe ofertat | Rafin Machinery',
      description:
        'Shikoni stokun e gatshëm me qarkullim të shpejtë, njësitë në ardhje dhe makineritë ose pjesët me etiketë oferte në një pamje kompakte të fokusuar te kërkesat.',
    },
    technicalLibrary: {
      title: 'Biblioteka teknike | Rafin Machinery',
      description:
        'Shfletoni kategoritë e bibliotekës teknike për manuale, referenca inspektimi, fletë specifikimesh, dokumente dorëzimi dhe rrugë kërkese për mbështetje.',
    },
    inquiryList: {
      title: 'Lista e kërkesave | Rafin Machinery',
      description:
        'Rishikoni makineritë, pjesët dhe mjetet e zgjedhura përpara se të dërgoni një kërkesë të përmbledhur B2B për ofertë ose kontratë te Rafin.',
    },
    requestQuote: {
      title: 'Kërko ofertë | Rafin Machinery',
      description:
        'Dërgoni një kërkesë B2B për makineri, pjesë, inspektim, planifikim dorëzimi, dokumente ose diskutim kontrate. Faqja mbështet vetëm kërkesa dhe marrëveshje offline.',
    },
    howItWorks: {
      title: 'Si funksionon | Rafin Machinery',
      description:
        'Kuptoni si Rafin Machinery menaxhon kërkesat, ndjekjen e ofertave, inspektimet, negociatat dhe marrëveshjet offline kompani me kompani.',
    },
    financingContracts: {
      title: 'Financimi dhe kontratat | Rafin Machinery',
      description:
        'Shikoni si trajtohen drejtpërdrejt me Rafin kushtet komerciale, kontratat, faturat dhe miratimet nga ana e blerësit pas kërkesës.',
    },
    deliveryInspection: {
      title: 'Dorëzimi dhe inspektimi | Rafin Machinery',
      description:
        'Shikoni si Rafin mbështet inspektimin e makinerive, planifikimin e dorëzimit, koordinimin e eksportit dhe dorëzimin komercial pas një kërkese blerësi.',
    },
    institutionsCleaning: {
      title: 'Shërbime Pastrimi për Institucione | GENERAL TRADING',
      description:
        'Shërbime profesionale pastrimi për zyra, shkolla, ndërtesa administrative dhe institucione publike ose private.',
    },
    about: {
      title: 'Rreth nesh | Rafin Machinery',
      description:
        'Mësoni si Rafin Machinery paraqet pajisje ndërtimi, aksesorë dhe inventar mbështetës për blerës profesionistë të kompanive.',
    },
    faq: {
      title: 'Pyetje të shpeshta | Rafin Machinery',
      description:
        'Pyetje të zakonshme rreth procesit të kërkesave në Rafin Machinery, mënyrave të çmimit, inspektimeve, dokumenteve, mbështetjes së dorëzimit dhe trajtimit të kontratave.',
    },
    contact: {
      title: 'Kontakt | Rafin Machinery',
      description:
        'Kontaktoni ekipin e shitjeve të Rafin Machinery për detaje produktesh, planifikim inspektimi, organizim dorëzimi, pjesë këmbimi dhe diskutim kontrate.',
    },
    privacy: {
      title: 'Privatësia | Rafin Machinery',
      description:
        'Udhëzime privatësie për kërkesat në faqe, informacionin e kontaktit dhe trajtimin e ardhshëm në prodhim për katalogun Rafin Machinery.',
    },
    terms: {
      title: 'Kushtet | Rafin Machinery',
      description:
        'Udhëzime për kushtet e informacionit të katalogut, çmimet orientuese, disponueshmërinë dhe trajtimin offline të kontratave kompani me kompani.',
    },
    notFound: {
      title: 'Faqja nuk u gjet | Rafin Machinery',
      description:
        'Faqja e kërkuar e katalogut nuk u gjet. Kthehuni në faqen kryesore ose vazhdoni shfletimin e inventarit aktiv të makinerive.',
    },
    productDetail: {
      fallbackTitle: 'Detajet e produktit | Rafin Machinery',
      fallbackDescription:
        'Shikoni specifikimet e produktit, disponueshmërinë, dokumentet dhe opsionet e kërkesës në katalogun Rafin Machinery.',
    },
    category: {
      fallbackTitle: 'Kategoria | Rafin Machinery',
      fallbackDescription: 'Shfletoni inventarin e makinerive sipas kategorisë në katalogun Rafin Machinery.',
    },
  },
  pages: {
    ...en.pages,
    institutionsCleaning: {
      shortLabel: 'Pastrim për Institucione',
      hero: {
        eyebrow: 'Pastrim për institucione',
        title: 'Shërbime Pastrimi për Institucione',
        description:
          'GENERAL TRADING ofron programe të besueshme pastrimi institucional për shkolla, zyra, ndërtesa administrative dhe ambiente profesionale që kërkojnë higjienë, standard të qëndrueshëm dhe ndjekje serioze të shërbimit.',
        primaryBadge: 'GENERAL TRADING',
        secondaryBadge: 'Partner profesional pastrimi për institucione',
        visualBadge: 'Program higjiene institucionale',
        highlights: [
          'Pastrim ditor, periodik dhe i thellë',
          'Orar fleksibël sipas aktivitetit',
          'Ekipe të mbikëqyrura dhe kontroll cilësie',
        ],
        visualTiles: ['Rutina ditore', 'Kontrolle cilësie', 'Planifikim fleksibël'],
      },
      intro: {
        eyebrow: 'Mbështetje e besueshme',
        title: 'Pastrim profesional i ndërtuar për ritmin e institucioneve',
        paragraphs: [
          'Pastrimi institucional nuk ka të bëjë vetëm me pamjen. Ai lidhet me krijimin e mjediseve të sigurta, të rregullta dhe higjienike për stafin, vizitorët, nxënësit dhe administratën në përditshmëri.',
          'GENERAL TRADING punon si partner afatgjatë shërbimi, duke e përshtatur planin e pastrimit me madhësinë, funksionin dhe orarin e objektit, në mënyrë që aktiviteti të vazhdojë pa ndërprerje të panevojshme.',
        ],
        points: [
          'Plane të strukturuara sipas profilit të objektit',
          'Komunikim i qartë dhe ndjekje kontrate',
          'Pajisje profesionale dhe produkte të përshtatshme pastrimi',
        ],
      },
      coverage: {
        eyebrow: 'Fusha e shërbimit',
        title: 'Ambientet që pastrojmë dhe mirëmbajmë',
        description:
          'Programet organizohen sipas qarkullimit real, nivelit të higjienës dhe përdorimit të përditshëm të ambienteve institucionale.',
        items: [
          {
            title: 'Zyra dhe ambiente administrative',
            description:
              'Poste pune, tavolina, zona dokumentacioni, zyra të brendshme dhe hapësira administrative të përdorimit të përditshëm, të mbajtura pastër dhe profesionale.',
          },
          {
            title: 'Klasa dhe salla trajnimi',
            description:
              'Ambiente mësimi dhe trajnimi të pastruara me kujdes për sipërfaqet, pikat e prekjes së përbashkët dhe paraqitjen e rregullt për stafin e vizitorët.',
          },
          {
            title: 'Korridore dhe shkallë',
            description:
              'Zona me qarkullim të lartë të trajtuara për të mbështetur pastërti të vazhdueshme, siguri dhe lëvizje të rregullt në të gjithë objektin.',
          },
          {
            title: 'Recepsione dhe zona pritjeje',
            description:
              'Hapësira ballore të mbajtura të prezantueshme dhe mikpritëse përmes kujdesit rutinë për dyshemetë, mobiliet, xhamat dhe sipërfaqet e kontaktit.',
          },
          {
            title: 'Tualete dhe zona higjiene',
            description:
              'Tualete, pika sanitare dhe ambiente me ndjeshmëri higjienike të lartë pastruar me fokus te dezinfektimi, furnizimi dhe kontrolli i rregullt.',
          },
          {
            title: 'Salla mbledhjesh dhe hapësira të përbashkëta',
            description:
              'Salla konferencash, zona pushimi, ambiente të ndara dhe hapësira të përdorimit të përbashkët, të mbajtura të rregullta për zhvillim normal të aktivitetit.',
          },
        ],
      },
      benefits: {
        eyebrow: 'Pse ne',
        title: 'Një model i besueshëm shërbimi për standarde institucionale',
        items: [
          {
            title: 'Personel i trajnuar dhe i mbikëqyrur',
            description:
              'Ekipet e pastrimit punojnë me mbikëqyrje dhe pritshmëri të qarta shërbimi për të garantuar zbatim të qëndrueshëm të përditshëm.',
          },
          {
            title: 'Orar fleksibël pastrimi',
            description:
              'Koha e shërbimit mund të përshtatet me ritmin e institucionit, pa ndërhyrë në mësim, orar zyrtar apo fluks vizitorësh.',
          },
          {
            title: 'Kontroll cilësie i vazhdueshëm',
            description:
              'Kontrollet pas shërbimit dhe rishikimi i vazhdueshëm ndihmojnë që standardi të ruhet në pastrimet ditore, periodike dhe të thella.',
          },
          {
            title: 'Mjete profesionale dhe produkte të përshtatshme',
            description:
              'Përdorim materiale dhe pajisje pastrimi të zgjedhura sipas mjedisit, llojit të sipërfaqes dhe kërkesës higjienike.',
          },
          {
            title: 'Plane të përshtatura për çdo objekt',
            description:
              'Çdo institucion merr një plan pastrimi të ndërtuar sipas organizimit të hapësirave, ngarkesës, qarkullimit dhe prioriteteve operative.',
          },
          {
            title: 'Ndjekje kontrate dhe komunikim',
            description:
              'Komunikimi i strukturuar mban të qarta pritshmëritë, raportimin dhe rregullimet praktike gjatë gjithë bashkëpunimit.',
          },
        ],
      },
      process: {
        eyebrow: 'Procesi i punës',
        title: 'Një rrugë e qartë nga vlerësimi te mbështetja e vazhdueshme',
        steps: [
          {
            step: '01',
            title: 'Vlerësimi i objektit',
            description:
              'Shqyrtojmë ambientin, zonat e qarkullimit, pikat higjienike dhe prioritetet e shërbimit para se të propozojmë zgjidhjen e pastrimit.',
          },
          {
            step: '02',
            title: 'Propozimi i planit të pastrimit',
            description:
              'Përgatisim një plan praktik sipas frekuencës, fushës së shërbimit, stafit, orarit dhe nevojave konkrete të institucionit.',
          },
          {
            step: '03',
            title: 'Ofrimi i shërbimit sipas programit',
            description:
              'Shërbimet ditore, periodike ose të thella kryhen sipas planit të miratuar dhe kërkesave operative të objektit.',
          },
          {
            step: '04',
            title: 'Mbikëqyrje dhe kontrolle cilësie',
            description:
              'Puna ndiqet me mbikëqyrje dhe verifikime të rregullta për të ruajtur standardin në të gjithë periudhën e kontratës.',
          },
          {
            step: '05',
            title: 'Mbështetje e vazhdueshme',
            description:
              'Qëndrojmë të disponueshëm për feedback, përshtatje dhe ndjekje, në mënyrë që shërbimi të mbetet gjithmonë në linjë me nevojat e institucionit.',
          },
        ],
      },
      served: {
        eyebrow: 'Institucione që mbulojmë',
        title: 'I përshtatshëm për një gamë të gjerë ambientesh profesionale',
        description:
          'GENERAL TRADING mund të mbështesë programe pastrimi për institucione dhe organizata që kërkojnë higjienë, besueshmëri dhe vazhdimësi në operim.',
        items: [
          'Shkolla dhe universitete',
          'Zyra të administratës publike',
          'Zyra korporative dhe tregtare',
          'Banka dhe zyra profesionale',
          'Institucione private',
          'Objekte të mëdha dhe ndërtesa të përbashkëta',
        ],
        noteTitle: 'Ndërtuar për bashkëpunim afatgjatë',
        note:
          'Fokusi ynë është te shërbimi i strukturuar, komunikimi i besueshëm dhe planet praktike të pastrimit që mund të mbahen vazhdimisht gjatë gjithë kontratës.',
      },
      cta: {
        eyebrow: 'Kërko ofertë',
        title: 'Ju duhet një plan pastrimi për institucionin ose objektin tuaj?',
        description:
          'Kërkoni ofertë, inspektim në objekt ose konsultim dhe GENERAL TRADING do të ndihmojë në përcaktimin e zgjidhjes së duhur të pastrimit institucional për ndërtesën dhe orarin tuaj.',
      },
    },
    home: {
      quickSearches: [
        'Eskavatorë me zinxhirë',
        'Gjeneratorë dizel',
        'Çekiçë hidraulikë',
        'Telehandler',
        'Kamionë vetëshkarkues',
        'Ankora kimike',
      ],
      hero: {
        eyebrow: 'Rafin Machinery',
        title: 'Zbulim teknik produktesh për blerës seriozë të ndërtimit dhe pajisjeve',
        description:
          'Shfletoni makineri ndërtimi, aksesorë, pjesë këmbimi, mjete, kamionë dhe pajisje mbështetëse. Ndërtoni një Listë Kërkesash, kërkoni informacion teknik dhe vazhdoni me çmime, inspektim, dorëzim ose diskutim kontrate drejtpërdrejt me Rafin.',
        searchPlaceholder: 'Kërko sipas produktit, SKU-së, modelit, markës ose fjalës kyçe teknike',
      },
      quickLinks: {
        eyebrow: 'Struktura e katalogut',
        title: 'Kërko fillimisht, më pas kaloni te produktet, mbështetja dhe rrugët e dokumenteve',
        links: ['Të gjitha pajisjet', 'Markat', 'Të disponueshme tani', 'Biblioteka teknike'],
      },
      processNote: {
        eyebrow: 'Shënim procesi',
        body:
          'Vetëm për kërkesa komerciale. Pa checkout, pa pagesë online, pa terminologji karroce dhe pa vendosje porosie. Faqja mbështet vetëm ofertat, inspektimin, dokumentacionin dhe ndjekjen e kontratës.',
      },
      categories: {
        eyebrow: 'Shfleto kategoritë',
        title: 'Grupe produktesh të ndërtuara për orientim të shpejtë të blerësit',
        description:
          'Nisni me grupet kryesore të inventarit, pastaj kaloni te listimet kompakte të produkteve, filtrat më të saktë dhe faqet teknike të produkteve.',
      },
      support: {
        eyebrow: 'Struktura e mbështetjes',
        title: 'Një ndërfaqe praktike B2B me rrugë më të forta mbështetjeje',
        description:
          'Blloqe kompakte mbështetjeje që qëndrojnë afër zbulimit të produkteve në vend që të fshihen pas një shtrese të veçantë korporative.',
        tiles: [
          {
            title: 'Kërkim më i fortë produktesh',
            description: 'Kërko sipas produktit, SKU-së, modelit, markës ose fjalës kyçe teknike që nga ekrani i parë.',
          },
          {
            title: 'Rrjedhë pune e orientuar nga kërkesa',
            description: 'Mblidhni disa produkte në një kërkesë të vetme para se të kërkoni ofertë, informacion, dokumente ose ndjekje kontrate.',
          },
          {
            title: 'Vlerësim teknik',
            description: 'Rishikoni specifikimet, shënimet e gjendjes, disponueshmërinë dhe referencat e inspektimit para përafrimit komercial.',
          },
          {
            title: 'Proces i drejtuar nga mbështetja',
            description: 'Dorëzimi, inspektimi, logjistika dhe dokumentacioni vazhdojnë drejtpërdrejt me ekipin e shitjeve pas kërkesës.',
          },
          {
            title: 'Rruga e bibliotekës teknike',
            description: 'Përdorni strukturën e mbështetjes për manuale, fletë specifikimesh, dokumente inspektimi dhe rrjedha kërkesash për dokumente.',
          },
        ],
      },
      featured: {
        eyebrow: 'Pajisje të veçuara',
        title: 'Listime gati për vlerësim serioz',
        description: 'Listime prioritare me disponueshmëri të qartë, mënyrë çmimi dhe veprime të drejtpërdrejta.',
      },
      availableNow: {
        eyebrow: 'Të disponueshme tani',
        title: 'Stoku aktual dhe njësitë në ardhje',
        description: 'Stoku aktual dhe njësitë në ardhje për blerësit që kanë nevojë për cikle më të shkurtra prokurimi.',
      },
      brands: {
        eyebrow: 'Markat në stok',
        title: 'Shfletoni prodhuesit aktualë në katalog',
        description: 'Përdorni preferencën për markën si rrugë të drejtpërdrejtë drejt inventarit të filtruar.',
      },
      cta: {
        eyebrow: 'Biblioteka teknike dhe furnizimi',
        title: 'Ju duhet një paketë dokumentesh ose një njësi specifike që nuk është e listuar?',
        description:
          'Përdorni Bibliotekën Teknike për materiale mbështetëse ose dërgoni një kërkesë për ofertë, informacion, inspektim ose diskutim kontrate të lidhur me një model apo kërkesë specifike.',
      },
    },
    brands: {
      eyebrow: 'Markat',
      title: 'Shfletoni prodhuesit e përfaqësuar në stokun aktual',
      description:
        'Çdo kartë marke ju kthen te katalogu i filtruar sipas prodhuesit, që blerësit të kalojnë shpejt nga preferenca e markës te listimet konkrete të disponueshme.',
      section: {
        eyebrow: 'Prodhuesit',
        title: 'Markat aktive në katalog',
        description:
          'Marka makinerish, punimesh rrugore, transporti, pajisjesh mbështetëse dhe pjesësh tashmë të pranishme në katalogun aktual statik.',
      },
    },
    about: {
      eyebrow: 'Rreth nesh',
      title: 'Rafin Machinery, i ndërtuar për blerje profesionale pajisjesh',
      description:
        'Rafin Machinery është një katalog komercial pajisjesh i mbështetur nga Rafin Company. Fokusi është te detajet e besueshme të listimeve, njohuria për makineritë dhe një proces i qartë shitjeje kompani me kompani.',
      business: {
        title: 'Çfarë bën ky biznes',
        paragraphs: [
          'Rafin Company përdor këtë katalog për të paraqitur makineri, mjete transporti, aksesorë, pjesë këmbimi dhe pajisje mbështetëse kantieri në një mënyrë që ndihmon blerësit e kompanive të vlerësojnë inventarin para kontaktit të drejtpërdrejtë.',
          'Ai nuk është qëllimisht një rindërtim i portofolit korporativ. Procesi i shitjes mbetet offline, i negociuar, i ndërgjegjshëm ndaj inspektimit dhe i drejtuar nga dokumentacioni.',
        ],
      },
      why: {
        title: 'Pse e përdorin blerësit',
        description:
          'Blerësit mund të shqyrtojnë specifikat, gjendjen, disponueshmërinë, shënimet e inspektimit dhe stilin e çmimit, pastaj të mbledhin disa produkte në një Listë Kërkesash para se të kërkojnë ofertë ose diskutim kontrate.',
      },
    },
    catalog: {
      eyebrow: 'Produkte',
      title: 'Shfletoni makineri, materiale, mjete, pajisje mbështetëse dhe aksesorë',
      description:
        'Kërkoni në inventar, ngushtoni sipas kategorisë ose familjes së produktit dhe shtoni produkte në Listën tuaj të Kërkesave para se të kërkoni çmime, inspektim, informacion ose ndjekje kontrate.',
      searchPlaceholder: 'Kërko sipas produktit, llojit të produktit, markës, modelit, SKU-së, vendndodhjes ose fjalës kyçe teknike',
      workflowNote: 'Rrjedhë pune vetëm me kërkesë. Çmimi final, inspektimi, dorëzimi dhe trajtimi i kontratës mbeten offline.',
      toolbarDescription: 'Pamje listimesh e orientuar nga produkti me filtra kanonikë për kategori, nënkategori dhe lloj produkti',
      noResults: {
        title: 'Nuk u gjetën produkte që përputhen',
        description: 'Asnjë produkt nuk përputhet me kombinimin aktual të kërkimit dhe filtrave. Rivendosni filtrat ose kthehuni te pamja më e gjerë e katalogut.',
      },
      mobileFiltersLabel: 'Filtrat e katalogut',
    },
    category: {
      searchWithin: 'Kërko brenda {{category}}',
      workflowNote: 'Shtoni produkte në Listën tuaj të Kërkesave, pastaj vazhdoni me ofertë, inspektim, dokumentacion ose ndjekje kontrate offline.',
      clearCategoryFilters: 'Pastro filtrat e kategorisë',
      emptyCategory: {
        title: 'Nuk ka ende produkte aktive në këtë kategori',
        description: 'Kjo kategori është aktive për furnizim dhe zgjerim të ardhshëm, por ende nuk ka listime të mbjella. Përdorni rrjedhën e kërkesës për të kërkuar mbështetje për siguri, PPE ose furnizime të ngjashme.',
      },
      noMatches: {
        title: 'Nuk ka produkte që përputhen në këtë kategori',
        description: 'Asnjë produkt në këtë kategori nuk përputhet me kërkimin ose filtrat aktualë. Rivendosni filtrat ose kthehuni te katalogu i plotë.',
      },
      faq: {
        eyebrow: 'Pyetje të shpeshta të kategorisë',
        title: 'Pyetjet që bëjnë blerësit për {{category}}',
        description: 'Përgjigje të fokusuara në këtë grup produktesh dhe mënyrën se si Rafin trajton inspektimin, disponueshmërinë, dokumentacionin dhe diskutimin e kontratës.',
      },
      support: {
        eyebrow: 'Mbështetje për këtë kategori',
        title: 'Ju duhen dokumente, detaje inspektimi ose një kërkesë e kombinuar?',
        description: 'Përdorni rrjedhën e kërkesës për paketa produktesh, pyetje për përputhshmërinë, planifikim dorëzimi ose trajtim kontrate të lidhur me këtë kategori.',
      },
      mobileFiltersLabel: 'Filtrat për {{category}}',
    },
    deals: {
      eyebrow: 'Të disponueshme tani',
      title: 'Stok me lëvizje të shpejtë, njësi në ardhje dhe listime me etiketë oferte',
      description:
        'Përqendrohuni te produktet e përshtatshme për cikle më të shkurtra prokurimi. Këto listime kalojnë sërish përmes kërkesës së drejtpërdrejtë, rishikimit të inspektimit dhe marrëveshjes offline kompani me kompani.',
      searchPlaceholder: 'Kërko stokun aktual sipas produktit, makinerisë, markës, modelit, SKU-së ose fjalës kyçe teknike',
      note: 'Përdoreni këtë pamje kur ekipi juaj ka nevojë për dukshmëri të stokut para se të kërkojë çmim ose inspektim.',
      toolbarDescription: 'Inventar i disponueshëm, në ardhje ose me etiketë oferte, gati për kërkesë të drejtpërdrejtë',
      noResults: {
        title: 'Nuk u gjet stok i gatshëm që përputhet',
        description: 'Provoni një status më të gjerë stoku, diapazon çmimi ose markë për të nxjerrë më shumë inventar aktual.',
      },
      cta: {
        eyebrow: 'Ju duhet konfirmim?',
        title: 'Stoku aktual ndjek të njëjtin proces offline të kërkesës',
        description: 'Nëse një listim duket afër por jo i saktë, përdorni Listën e Kërkesave ose kërkoni mbështetje furnizimi drejtpërdrejt nga ekipi i shitjeve.',
      },
      mobileFiltersLabel: 'Filtrat e stokut të gatshëm',
    },
    technicalLibrary: {
      eyebrow: 'Biblioteka teknike',
      title: 'Gjeni referenca teknike, regjistra inspektimi dhe dokumente mbështetëse',
      description:
        'Kjo faqe është strukturuar si një sipërfaqe dokumentesh e orientuar nga mbështetja për manuale produktesh, fletë specifikimesh, referenca inspektimi, regjistra dorëzimi dhe rrjedha kërkesash për dokumente.',
      searchPlaceholder: 'Kërko manuale, dokumente inspektimi ose fletë specifikimesh',
      requestNote: 'Nëse skedari i saktë nuk është ende i listuar, përdorni formularin e kërkesës dhe përmendni produktin, modelin ose SKU-në.',
      cta: {
        eyebrow: 'Ju duhet mbështetje specifike për produktin?',
        title: 'Kërkoni Rafin një paketë dokumentesh të lidhur me një listim specifik',
        description:
          'Përmendni kategorinë, modelin, SKU-në ose faqen e produktit në mesazhin tuaj dhe Rafin mund të përgatisë manualin, regjistrin e inspektimit, fletën e specifikimeve ose referencën e dorëzimit që ju nevojitet.',
      },
    },
    requestQuote: {
      eyebrow: 'Kërko ofertë',
      title: 'Dërgoni një kërkesë komerciale te Rafin Machinery',
      description:
        'Përdorni një formular të vetëm për informacion produkti, oferta, takime inspektimi, diskutim dorëzimi, kërkesa dokumentesh ose ndjekje kontrate. Ky është proces vetëm me kërkesë, jo checkout.',
    },
    howItWorks: {
      eyebrow: 'Si funksionon',
      title: 'Një proces i qartë B2B për kërkesat e makinerive',
      description:
        'Kjo faqe është një katalog dhe mjet kërkesash. Blerësit shfletojnë produktet, ndërtojnë një Listë Kërkesash dhe vazhdojnë procesin komercial drejtpërdrejt me Rafin.',
      afterInquiryTitle: 'Çfarë ndodh pasi të dërgoni një kërkesë',
      afterInquiryPoints: [
        'Rafin rishikon produktet në Listën tuaj të Kërkesave dhe përgjigjet me detaje teknike, kontekst disponueshmërie dhe hapin tjetër komercial.',
        'Planifikimi i inspektimit, rishikimi i dokumentacionit dhe negociatat vazhdojnë drejtpërdrejt me ekipin e shitjeve.',
        'Kushtet e kontratës, kushtet e pagesës dhe fushëveprimi i dorëzimit trajtohen offline mes kompanive dhe jo përmes faqes së internetit.',
      ],
    },
    financingContracts: {
      eyebrow: 'Financimi & kontratat',
      title: 'Kushtet komerciale diskutohen drejtpërdrejt me Rafin',
      description:
        'Katalogu mbështet shitje me bazë kontrate dhe negociata të drejtpërdrejta kompani me kompani në vend të trajtimit të transaksioneve online.',
      points: [
        'Vetëm shitje me kontratë',
        'Negociata kompani me kompani',
        'Kushtet komerciale diskutohen drejtpërdrejt me Rafin',
        'Faturat, dokumentacioni dhe kushtet e dorëzimit trajtohen pas kërkesës',
        'Mbështetja për inspektim dhe logjistikë mund të jetë pjesë e të njëjtit diskutim',
        'Kushtet e pagesës dhe financimi diskutohen drejtpërdrejt vetëm kur janë të disponueshme',
      ],
    },
    deliveryInspection: {
      eyebrow: 'Dorëzim & inspektim',
      title: 'Mbështetje për inspektimin, logjistikën dhe dorëzimin',
      description:
        'Rafin mund të koordinojë hapat praktikë të radhës pasi një blerës identifikon produktin e duhur. Kjo përfshin diskutimin e inspektimit, planifikimin e transportit dhe përgatitjen e dokumenteve komerciale.',
      points: [
        'Koordinim i takimeve të inspektimit',
        'Rishikim i gjendjes së makinerisë dhe sqarime komerciale',
        'Planifikim transporti për dorëzim lokal ose eksport',
        'Dokumentacioni i nevojshëm dhe mbështetje për faturat',
        'Mbështetje për planifikimin e dorëzimit lokal ose eksportit',
        'Kontakt i drejtpërdrejtë me shitjet para trajtimit përfundimtar të kontratës',
      ],
      promiseTitle: 'Çfarë premton dhe çfarë nuk premton kjo faqe',
      promiseDescription:
        'Faqja i ndihmon blerësit të kuptojnë se inspektimi dhe logjistika mund të diskutohen. Afatet përfundimtare, kostoja e dorëzimit, fushëveprimi i eksportit dhe detajet e dorëzimit konfirmohen drejtpërdrejt me Rafin pas kërkesës.',
    },
    faq: {
      eyebrow: 'Pyetje të shpeshta',
      title: 'Pyetje të zakonshme për procesin e blerësit te Rafin',
      description: 'Përgjigje për blerës, kontraktorë dhe ekipe prokurimi që përdorin katalogun e makinerive të bazuar te kërkesa.',
    },
    contact: {
      eyebrow: 'Kontakt',
      title: 'Kontaktoni ekipin e shitjeve të makinerive',
      description:
        'Flisni drejtpërdrejt me anën e shitjeve të Rafin Machinery për informacion produkti, koordinim inspektimi, diskutim dorëzimi ose trajtim kontrate.',
      salesContacts: {
        eyebrow: 'Kontaktet e shitjeve',
        title: 'Kontaktet komerciale sipas fushës',
      },
      visit: {
        eyebrow: 'Vizitë dhe inspektim',
        title: 'Pika e shitjeve dhe koordinimit në Tiranë',
        description:
          'Përdorni adresën dhe kontaktet e shitjeve për të organizuar takime në zyrë, vizita në oborr, inspektim makinerie ose koordinim dorëzimi pas shqyrtimit të kërkesës.',
        placeholder: 'Pikë koordinimi për takime në zyrë, planifikim inspektimi dhe dorëzim',
      },
    },
    inquiryList: {
      eyebrow: 'Lista e Kërkesave',
      title: 'Ndërtoni një kërkesë të dobishme rreth produkteve që i duhen ekipit tuaj',
      description:
        'Kjo nuk është checkout. Lista juaj e Kërkesave e ndihmon Rafin të përgatisë detaje produkti, çmime, opsione inspektimi, mbështetje dokumentesh, diskutim dorëzimi dhe hapat e ardhshëm të kontratës.',
      empty: {
        title: 'Lista juaj e Kërkesave është bosh',
        description:
          'Shtoni produkte nga katalogu për të nisur një kërkesë kompanie ose kontaktoni drejtpërdrejt ekipin e shitjeve për një kërkesë të përgjithshme makinerish.',
      },
      notesPlaceholder: 'Shembull: kërkesë për kohën e inspektimit, konfirmim seriali, kontrolle përputhshmërie, pjesë këmbimi ose diskutim dorëzimi.',
      summary: {
        eyebrow: 'Përmbledhja e kërkesës',
        description:
          'Vazhdoni te formulari i kërkesës kur lista juaj pasqyron makineritë, mjetet ose pjesët që kompania juaj dëshiron të diskutojë.',
      },
      preparedTitle: 'Çfarë përgatit Rafin nga kjo listë',
      preparedPoints: [
        'Mënyrën e çmimit dhe sqarimin komercial për secilin produkt të zgjedhur',
        'Opsionet e inspektimit, rishikimin e gjendjes dhe ndjekjen e dokumentacionit',
        'Diskutimin për pjesë ose aksesorë të kombinuar aty ku ka nevojë',
        'Koordinimin për kontratë, dorëzim dhe hapat e radhës pas kontaktit të blerësit',
      ],
    },
    privacy: {
      eyebrow: 'Privatësia',
      title: 'Udhëzim për njoftimin e privatësisë',
      description:
        'Ky build frontend aktualisht i mban ndërveprimet e formularëve në shfletues. Para publikimit në prodhim, Rafin duhet të publikojë një njoftim të plotë privatësie që mbulon regjistrat e kërkesave, të dhënat e kontaktit, ruajtjen dhe trajtimin e ndjekjes.',
      body:
        'Rafin duhet të konfirmojë se si ruhen të dhënat e kërkesës, kush ka qasje, sa kohë ruhen dhe cilat sisteme biznesi i marrin ato pasi një blerës dërgon një kërkesë.',
    },
    terms: {
      eyebrow: 'Kushtet',
      title: 'Udhëzim për kushtet e përdorimit',
      description:
        'Informacioni i produktit në këtë build frontend është përmbajtje ilustrative katalogu për një proces shitjeje të bazuar në kërkesë. Kushtet përfundimtare komerciale konfirmohen drejtpërdrejt me Rafin.',
      body:
        'Disponueshmëria, çmimet, specifikimet, dokumentacioni, dorëzimi, inspektimi dhe kushtet e kontratës duhet të konfirmohen drejtpërdrejt me Rafin gjatë procesit offline kompani me kompani.',
    },
    notFound: {
      title: 'Kjo faqe e katalogut nuk ekziston',
      description:
        'Kthehuni në faqen kryesore ose vazhdoni te katalogu i pajisjeve për të shfletuar build-in aktiv të Rafin Machinery.',
    },
    productDetail: {
      keyFacts: {
        brandModel: 'Marka / Modeli',
        condition: 'Gjendja',
        availability: 'Disponueshmëria',
        operatingHours: 'Orët e punës',
        mileage: 'Kilometrazhi',
        unitOfMeasure: 'Njësia matëse',
        usageUnit: 'Përdorimi / Njësia',
        serialStock: 'Seriali / Stoku',
      },
      specs: {
        enginePower: 'Fuqia e motorit',
        operatingWeight: 'Pesha operative',
        capacity: 'Kapaciteti',
        fuelType: 'Lloji i karburantit',
        transmission: 'Transmisioni',
        unitOfMeasure: 'Njësia matëse',
      },
      inspectionNotesFallback: 'Shënimet e inspektimit mund të ndahen drejtpërdrejt gjatë shqyrtimit të kërkesës.',
      inspectionHighlightsEyebrow: 'Pikat kryesore të inspektimit',
      inspectionHighlightsTitle: 'Pse blerësit pyesin për këtë listim',
      inquiryActionsEyebrow: 'Veprimet e kërkesës',
      inquiryActionsNote: 'Vlerësojeni fillimisht produktin këtu. Çmimi final, fushëveprimi i inspektimit, dokumentacioni, negociatat dhe kushtet e kontratës trajtohen drejtpërdrejt pas kërkesës.',
      sideNotes: {
        location: 'Mund të diskutohen inspektimi dhe marrja ose organizimi i dorëzimit për {{location}}.',
        inquiryList: 'Shtojeni këtë artikull në Listën e Kërkesave nëse dëshironi një kërkesë të vetme që mbulon disa makineri, mjete, materiale ose aksesorë.',
        documents: 'Ju duhen manuale ose dokumente reference? Përdorni Bibliotekën Teknike ose kërkojini përmes formularit të ofertës.',
      },
      inspectionNotesTitle: 'Shënime inspektimi',
      documentsTitle: 'Dokumente dhe referenca mbështetëse',
      documentKinds: {
        brochure: 'broshurë',
        'inspection-report': 'raport inspektimi',
        'service-record': 'regjistër shërbimi',
        'serial-verification': 'verifikim seriali',
        certificate: 'certifikatë',
        video: 'video',
      },
      documentsFallback: 'Dokumentet specifike mund të konfirmohen gjatë shqyrtimit të kërkesës, bashkë me verifikimin serial, referencat e shërbimit dhe dokumentet komerciale.',
      deliveryContractTitle: 'Rruga e dorëzimit dhe kontratës',
      deliveryContractPoints: [
        'Pyetni për takime inspektimi, video pune ose verifikim në vend para marrëveshjes.',
        'Çmimi final, kushtet e kontratës, aksesorët e kombinuar dhe planifikimi i dorëzimit trajtohen kompani me kompani pas kërkesës.',
      ],
      previousProduct: 'Produkti i mëparshëm',
      backToCategory: 'Kthehu te kategoria',
      nextProduct: 'Produkti tjetër',
      similarProductsTitle: 'Produkte të ngjashme',
      noSimilarProducts: {
        title: 'Nuk ka produkte të ngjashme të disponueshme tani',
        description: 'Aktualisht nuk ka produkte të ngjashme të listuara për këtë artikull. Vazhdoni shfletimin e katalogut të plotë ose kërkoni mbështetje për furnizim.',
      },
    },
  },
  layout: {
    ...en.layout,
    header: {
      logoAlt: 'General Trading',
      tagline: 'Katalog teknik pajisjesh',
      description: 'Makineri ndërtimi, pjesë, pajisje mbështetëse dhe kërkesë e drejtpërdrejtë B2B',
      desktopSearchPlaceholder: 'Kërko sipas produktit, SKU-së, modelit, markës ose pjesës',
      mobileSearchPlaceholder: 'Kërko sipas produktit, SKU-së, modelit ose pjesës',
      utilitySearchDescription: 'Katalog i orientuar nga produkti. Kërko sipas produktit, SKU-së, modelit, markës ose fjalës kyçe teknike.',
      inquiryList: 'Lista e Kërkesave',
    },
    footer: {
      cta: {
        eyebrow: 'Mbështetje për blerësin',
        title: 'Ndërtoni një Listë Kërkesash, pastaj kërkoni ofertë, paketë dokumentesh ose diskutim kontrate',
        description:
          'Kjo faqe është një katalog i orientuar drejt prokurimit. Negociatat përfundimtare, inspektimi, dokumentacioni, dorëzimi dhe trajtimi i kontratës mbeten të drejtpërdrejta mes kompanive.',
      },
      products: 'Produkte',
      servicesSupport: 'Shërbime & Mbështetje',
      updatesTitle: 'Përditësime teknike dhe stoku',
      updatesDescription: 'Kërkoni njoftime stoku për makineri, pjesë dhe përditësime të mbështetjes së dokumenteve teknike.',
      bottomNote: 'Katalog i orientuar nga kërkesa. Ofertat, kontratat, inspektimi dhe kushtet komerciale trajtohen drejtpërdrejt me Rafin.',
    },
    mobileMenu: {
      searchPlaceholder: 'Kërko makineri, markë, model...',
      inquiryListDescription: 'Ruani produktet këtu para se të kërkoni çmim, inspektim ose ndjekje kontrate.',
      viewAllCategory: 'Shiko të gjitha {{category}}',
    },
    megaMenu: {
      productsEyebrow: 'Produkte',
      productsTitle: 'Shfletoni makineri, aksesorë, mjete, pjesë dhe pajisje mbështetëse',
      featuredEyebrow: 'Rruga e veçuar',
      featuredTitle: 'Stoku i gatshëm dhe njësitë në ardhje',
      featuredDescription: 'Kaloni drejtpërdrejt te listimet që blerësit zakonisht u nevojiten të parat: makineri të disponueshme, stok në ardhje dhe pajisje me etiketë oferte.',
      quickLinks: 'Lidhje të shpejta',
      supportEyebrow: 'CTA mbështetjeje',
      supportTitle: 'Ju duhen manuale, fletë specifikimesh ose referenca inspektimi?',
      supportDescription: 'Përdorni Bibliotekën Teknike ose kërkoni dokumente të lidhura me një model ose SKU specifike.',
    },
  },
  forms: {
    contact: {
      eyebrow: 'Kontakto shitjet',
      title: 'Nisni një bisedë të drejtpërdrejtë për pajisjet',
      description: 'Përdoreni këtë formular për detaje produkti, kërkesa ofertash, planifikim inspektimi, koordinim dorëzimi ose diskutim kontrate.',
      messagePlaceholder: 'Ndani makineritë, pjesët ose mbështetjen që ju nevojitet, bashkë me detaje për inspektimin, dorëzimin ose kontratën.',
      consent: 'E kuptoj që ky mesazh nis një kërkesë të drejtpërdrejtë kompani me kompani. Në këtë faqe nuk ndodh pagesë online ose marrëveshje automatike.',
      success: 'Kërkesa juaj është regjistruar në këtë build frontend. Rafin do të ndjekë drejtpërdrejt bisedën komerciale.',
    },
    quote: {
      eyebrow: 'Kërko ofertë ose kontratë',
      title: 'Përgatitni një kërkesë komerciale për produktet tuaja të zgjedhura',
      description: 'Përdorni një formular të vetëm për informacion produkti, kërkesa ofertash, diskutim kontrate, planifikim inspektimi, pyetje për dorëzimin ose kërkesa dokumentesh.',
      buyerDetails: 'Detajet e blerësit dhe kompanisë',
      requestIntent: 'Qëllimi dhe afati i kërkesës',
      requestMessage: 'Mesazhi i kërkesës',
      messagePlaceholder: 'Tregojini Rafin çfarë ju nevojitet, nëse kërkohet inspektim dhe çdo detaj për dorëzim, kontratë, përputhshmëri ose dokumentacion që ka rëndësi.',
      consent: 'E kuptoj që kjo kërkesë nis një proces offline kompani me kompani. Në këtë faqe nuk ndodh checkout, porosi automatike ose pagesë online.',
      success: 'Kërkesa juaj është përgatitur në këtë build frontend. Rafin do të ndjekë drejtpërdrejt për çmimin, inspektimin, dokumentet, dorëzimin ose diskutimin e kontratës.',
      selectedProductsTitle: 'Produktet në këtë kërkesë',
      noProducts: 'Aktualisht nuk ka produkte në Listën e Kërkesave. Ju prapë mund të dërgoni një kërkesë të përgjithshme për pajisje.',
      whatNextTitle: 'Çfarë ndodh më pas',
      whatNextDescription: 'Ky formular e drejton kërkesën në një rrugë ndjekjeje offline B2B pa nënkuptuar checkout ose vendosje porosie.',
      whatNextPoints: [
        'Rafin shqyrton produktet e zgjedhura, sasitë, shënimet dhe llojin e mbështetjes që ju nevojitet.',
        'Shënimet e inspektimit, dokumentacioni, fushëveprimi i dorëzimit dhe detajet e kontratës mund të sqarohen më pas drejtpërdrejt.',
        'Në këtë faqe nuk ndodh pagesë online ose marrëveshje automatike.',
      ],
    },
    newsletter: {
      success: 'Kërkesa për njoftim u regjistrua në këtë build frontend. Integrimi i dërgesave dhe emailit mund të lidhet më vonë.',
    },
  },
  catalog: {
    sortOptions: [
      { value: 'featured', label: 'Të veçuara' },
      { value: 'newest', label: 'Më të rejat' },
      { value: 'price-asc', label: 'Çmimi nga i ulëti te i larti' },
      { value: 'price-desc', label: 'Çmimi nga i larti te i ulëti' },
      { value: 'year-desc', label: 'Viti më i ri' },
      { value: 'hours-asc', label: 'Orët nga më të ulëtat te më të lartat' },
      { value: 'mileage-asc', label: 'Kilometrazhi nga më i ulëti te më i larti' },
    ],
    budgetBands: [
      { slug: 'under-5000', label: 'Nën 5,000 EUR' },
      { slug: 'under-25000', label: 'Nën 25,000 EUR' },
      { slug: 'under-100000', label: 'Nën 100,000 EUR' },
      { slug: 'price-on-request', label: 'Çmimi sipas kërkesës' },
    ],
  },
} as const;
