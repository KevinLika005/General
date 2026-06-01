import { getCurrentLanguage } from './config';

function deepGet(source: Record<string, unknown>, path: string): unknown {
  return path.split('.').reduce<unknown>((current, segment) => {
    if (!current || typeof current !== 'object' || !(segment in current)) {
      return undefined;
    }

    return (current as Record<string, unknown>)[segment];
  }, source);
}

export function localizeCatalogValue<T>(path: string, fallback: T): T {
  if (getCurrentLanguage() !== 'sq') {
    return fallback;
  }

  const value = deepGet(sqCatalogLocale, path);
  return (value as T | undefined) ?? fallback;
}

export const sqCatalogLocale = {
  navigation: {
    primary: {
      products: 'Produkte',
      solutions: 'Zgjidhje',
      servicesSupport: 'Shërbime & Mbështetje',
      deals: 'Oferta / Të disponueshme tani',
      technicalLibrary: 'Biblioteka teknike',
      contact: 'Kontakt',
    },
    solutions: {
      howItWorks: {
        title: 'Si funksionon',
        description: 'Kuptoni procesin e kërkesave për produkte vetëm përmes interesimit.',
      },
      financingContracts: {
        title: 'Financimi & Kontratat',
        description: 'Shikoni trajtimin offline të kushteve komerciale dhe diskutimeve për kontrata.',
      },
      deliveryInspection: {
        title: 'Dorëzimi & Inspektimi',
        description: 'Shikoni si menaxhohen planifikimi i inspektimit dhe mbështetja logjistike.',
      },
    },
    support: {
      technicalLibrary: {
        title: 'Biblioteka teknike',
        description: 'Manuale, fletë specifikimesh, referenca inspektimi dhe rrugë për kërkesa dokumentesh.',
      },
      institutionsCleaning: {
        title: 'Pastrim për Institucione',
        description: 'Programe profesionale pastrimi për zyra, shkolla dhe ambiente institucionale.',
      },
      faq: {
        title: 'Pyetje të shpeshta',
        description: 'Përgjigje të shpejta për mënyrat e çmimit, inspektimin, dokumentacionin dhe dorëzimin.',
      },
      contactSales: {
        title: 'Kontakto shitjet',
        description: 'Flisni drejtpërdrejt me ekipin e shitjeve dhe mbështetjes.',
      },
      brands: {
        title: 'Markat',
        description: 'Hyni në katalog sipas prodhuesit.',
      },
    },
    footerCompany: {
      about: 'Rreth nesh',
      privacy: 'Privatësia',
      terms: 'Kushtet',
    },
  },
  site: {
    shortDescription:
      'Katalog pajisjesh industriale për makineri ndërtimi, mjete transporti, pjesë dhe mbështetje kantieri, i menaxhuar përmes kërkesave të drejtpërdrejta B2B.',
    tagline:
      'Makineri ndërtimi, pajisje, pjesë dhe furnizim me bazë kontrate për punë serioze.',
    locationLabel: 'Tiranë, Shqipëri',
    hours: 'Hën - Sht, 08:00 - 18:00',
    heroHeadline: 'Makineri ndërtimi, pajisje dhe pjesë për punë serioze',
    heroSubheadline:
      'Shfletoni makineri, aksesorë, pjesë këmbimi dhe pajisje kantieri. Kërkoni detaje produkti, çmime, inspektim ose diskutim kontrate drejtpërdrejt me Rafin.',
    topUtilityNote:
      'Vetëm për kërkesa komerciale. Oferta, inspektimi dhe ndjekja e kontratës trajtohen drejtpërdrejt.',
    trustFeatures: {
      commerciallyUsefulListingDetail: {
        title: 'Detaje listimi komercialisht të dobishme',
        description:
          'Listimet theksojnë specifikimet kryesore, shënimet e gjendjes dhe kontekstin e disponueshmërisë për blerës teknikë.',
      },
      companyToCompanyRequestHandling: {
        title: 'Trajtim i kërkesave kompani me kompani',
        description:
          'Kërkesat shqyrtohen drejtpërdrejt me Rafin për ekipet e prokurimit, kontraktorët dhe operatorët e flotës.',
      },
      inspectionSupport: {
        title: 'Mbështetje për inspektim',
        description:
          'Makineritë mund të shikohen fizikisht ose të përgatiten për inspektim të planifikuar para konfirmimit komercial.',
      },
      deliveryAndLogisticsSupport: {
        title: 'Mbështetje për dorëzim dhe logjistikë',
        description:
          'Planifikimi i transportit, koordinimi i eksportit dhe kushtet lokale të dorëzimit trajtohen pas shqyrtimit të kërkesës.',
      },
      documentationSupport: {
        title: 'Mbështetje dokumentacioni',
        description:
          'Referencat e inspektimit, verifikimi i numrit serial dhe dokumentet përkatëse të makinerisë trajtohen gjatë procesit offline të shitjes.',
      },
      noOnlinePaymentFlow: {
        title: 'Pa pagesë online',
        description:
          'Negociatat, kontratat, miratimet dhe marrëveshja përfundimtare mbeten direkte ndërmjet kompanive dhe jashtë faqes.',
      },
    },
    homeStats: {
      inventoryRecords: 'Regjistra inventari',
      productGroups: 'Grupe produktesh',
      activeBrands: 'Marka aktive',
      salesModel: 'Modeli i shitjes',
      b2bOnly: 'Vetëm B2B',
    },
    howItWorksSteps: {
      browseCatalog: {
        title: 'Shfletoni katalogun',
        description: 'Kërkoni sipas llojit të makinerisë, markës, modelit, SKU-së, statusit të stokut ose fjalës kyçe teknike.',
      },
      buildInquiryList: {
        title: 'Ndërtoni listën e kërkesave',
        description:
          'Mblidhni një ose më shumë produkte dhe mbani shënime për prokurim, rishikim teknik ose ndjekje kontrate.',
      },
      sendCommercialRequest: {
        title: 'Dërgoni një kërkesë komerciale',
        description:
          'Kërkoni çmim, sqarim teknik, planifikim inspektimi, organizim dorëzimi ose diskutim kontrate.',
      },
      rafinReviewsRequest: {
        title: 'Rafin shqyrton kërkesën',
        description:
          'Ekipi i shitjeve kontrollon disponueshmërinë, përshtatjen teknike, dokumentacionin dhe rrugën e duhur të ndjekjes komerciale.',
      },
      inspectionAndClarificationFollow: {
        title: 'Vijojnë inspektimi dhe sqarimet',
        description:
          'Rishikimi i makinerisë, sqarimet, pjesët e bashkëngjitura dhe diskutimi i dokumentacionit vazhdojnë drejtpërdrejt me Rafin.',
      },
      contractTermsOffline: {
        title: 'Kushtet e kontratës trajtohen offline',
        description:
          'Faturat, miratimet, formulimi i kontratës dhe kushtet e pagesës diskutohen kompani me kompani pas fazës së kërkesës.',
      },
      deliveryAndLogisticsCoordinated: {
        title: 'Koordinohen dorëzimi dhe logjistika',
        description:
          'Marrja, dorëzimi lokal, planifikimi i eksportit dhe detajet e dorëzimit diskutohen pasi të jetë rënë dakord baza komerciale.',
      },
    },
  },
  brands: {
    'atlas-copco': { description: 'Kompresorë portativë dhe pajisje mbështetëse kantieri për operacione të vështira në terren.' },
    bomag: { description: 'Makineri ngjeshjeje dhe punimesh rrugore për kontraktorë dhe programe infrastrukture.' },
    'bosch-professional': { description: 'Vegla profesionale elektrike për shpim, instalim dhe punime në beton.' },
    caterpillar: { description: 'Makineri të rënda dhe platforma aksesorësh për gërmim dhe ndërtim të përgjithshëm.' },
    dewalt: { description: 'Sisteme veglash pa kabllo për ekipe instalimi dhe mbështetje punishteje.' },
    epiroc: { description: 'Çekiçë hidraulikë dhe aksesorë produktiviteti për prishje dhe gurore.' },
    faymonville: { description: 'Rimorkio lowbed dhe transport i rëndë për logjistikën e makinerive.' },
    fischer: { description: 'Sisteme ankorimi dhe fiksimi për instalime strukturore dhe industriale.' },
    fluke: { description: 'Instrumente elektrike testimi për mirëmbajtje, diagnostikim dhe komisionim.' },
    honda: { description: 'Pajisje portative me motor për drenazh kantieri dhe transferim uji.' },
    jcb: { description: 'Backhoe dhe telehandler për flota të gjithanshme kontraktore dhe bashkiake.' },
    knauf: { description: 'Materiale pllakash dhe sisteme gipsi për ambiente teknike dhe montime rezistente ndaj zjarrit.' },
    kubota: { description: 'Mini-eskavatorë kompaktë për akses urban, peizazh dhe punime utilitare.' },
    'mercedes-benz': { description: 'Platforma transporti komercial dhe kamionësh ndërtimi.' },
    perkins: { description: 'Pajisje gjenerimi energjie për rezerva dhe operacione në distancë.' },
    ridgid: { description: 'Vegla për tubacione dhe sisteme punishteje për instalues dhe ekipe mirëmbajtjeje.' },
    'schneider-electric': { description: 'Produkte mbrojtjeje elektrike të tensionit të ulët për blerës teknikë dhe montues panelesh.' },
    volvo: { description: 'Pajisje ndërtimi të njohura për performancën në ngarkim dhe komoditetin e operatorit.' },
  },
  categories: {
    'heavy-equipment': {
      title: 'Pajisje të rënda',
      shortDescription: 'Makineri për gërmim, ngarkim dhe ngjeshje për infrastrukturë dhe punime kantieri.',
      description: 'Shfletoni pajisje gërmimi dhe ngarkimi të përzgjedhura për kontraktorë, ekipe punimesh civile, operatorë infrastrukture dhe programe mbështetjeje guroreje. Listimet mbeten vetëm për kërkesa, me rishikim teknik, inspektim dhe trajtim kontrate të menaxhuar offline.',
      seoIntro: 'Shikoni eskavatorë me zinxhirë, mini-eskavatorë, backhoe loader, ngarkues me goma dhe rulë të strukturuar për kërkesë praktike B2B, inspektim dhe ndjekje komerciale.',
      subcategories: {
        excavation: {
          title: 'Gërmim',
          description: 'Makineri gërmimi dhe hapjeje kanalesh për punime dheu, utilitete dhe ndërtim të përgjithshëm.',
          productTypes: {
            'tracked-excavators': { title: 'Eskavatorë me zinxhirë', description: 'Eskavatorë crawler për punime të mëdha dheu dhe ndërtim civil.' },
            'mini-excavators': { title: 'Mini-eskavatorë', description: 'Eskavatorë kompaktë për akses urban, peizazh dhe kantierë të ngushtë.' },
          },
        },
        'loading-compaction': {
          title: 'Ngarkim & Ngjeshje',
          description: 'Makineri shumëfunksionale për cikle ngarkimi, punë utilitare dhe ngjeshje terreni.',
          productTypes: {
            'backhoe-loaders': { title: 'Backhoe Loader', description: 'Makineri të gjithanshme për hapje kanalesh, ngarkim dhe mbështetje bashkiake.' },
            'wheel-loaders': { title: 'Ngarkues me goma', description: 'Platforma ngarkimi për depo agregatesh, impiante betoni dhe menaxhim stoku.' },
            rollers: { title: 'Rulë', description: 'Rulë me një daulle ose tandem për ngjeshje dhe përgatitje sipërfaqeje.' },
          },
        },
      },
    },
    'lifting-access': {
      title: 'Ngritje & Akses',
      shortDescription: 'Telehandler dhe pajisje aksesi për lëvizje materialesh dhe punë në lartësi.',
      description: 'Kjo kategori u shërben kontraktorëve dhe blerësve industrialë që kanë nevojë për shtrirje, stabilitet në manovrim dhe pajisje kompakte aksesi të mbështetura përmes një rrjedhe të drejtpërdrejtë kërkese.',
      seoIntro: 'Shikoni produkte ngritjeje dhe aksesi me të dhëna të qarta për shtrirjen, manovrimin dhe disponueshmërinë përpara se të kërkoni ofertë ose mbështetje për inspektim.',
      subcategories: {
        'telescopic-handling': {
          title: 'Manovrim teleskopik',
          description: 'Platforma ngritjeje dhe shtrirjeje për paleta, logjistikë kantieri dhe lëvizje materialesh.',
          productTypes: {
            telehandlers: { title: 'Telehandler', description: 'Manovrues teleskopikë për terren të vështirë në kantierë dhe oborre të kombinuara.' },
          },
        },
      },
    },
    'trucks-transport': {
      title: 'Kamionë & Transport',
      shortDescription: 'Transport ndërtimi në rrugë për ngarkesa, lëvizje makinerish dhe logjistikë kantieri.',
      description: 'Për rinovim flote dhe logjistikë projekti, kjo kategori mbulon kamionë vetëshkarkues rrugorë dhe rimorkio për transport makinerish, të përshtatura për operacione kontraktore dhe industriale.',
      seoIntro: 'Shfletoni mjete transporti për ndërtim të konfiguruara për punë me dhera dhe logjistikë makinerish, me kilometrazh, status komercial dhe referenca dokumentesh të dukshme që në fillim.',
      subcategories: {
        'haulage-transport': {
          title: 'Transport & Haulage',
          description: 'Mjete transporti për ngarkesa dherash, punë flote rrugore dhe zhvendosje pajisjesh.',
          productTypes: {
            'dump-trucks': { title: 'Kamionë vetëshkarkues', description: 'Kamionë vetëshkarkues komercialë për rrugë dhe përdorim në flotë të përzier.' },
            'lowbed-trailers': { title: 'Rimorkio lowbed', description: 'Rimorkio low-loader për transport pajisjesh të rënda dhe ngarkesash jashtë përmasave.' },
          },
        },
      },
    },
    'site-power-support': {
      title: 'Energji & Mbështetje Kantieri',
      shortDescription: 'Mbështetje e përkohshme me energji dhe ajër për kantiere aktive dhe operacione në distancë.',
      description: 'Pajisje thelbësore mbështetëse për energji rezervë, furnizim me ajër dhe vazhdimësi projekti, me trajtim komercial të orientuar nga kërkesa dhe faqe produktesh të drejtuara nga specifikimet.',
      seoIntro: 'Kërkoni gjeneratorë dhe produkte portative mbështetjeje me ajër për vazhdimësinë e kantierit dhe industrisë, me ndjekje të drejtpërdrejtë për ofertë dhe dorëzim.',
      subcategories: {
        'temporary-power-air': {
          title: 'Energji & Ajër i Përkohshëm',
          description: 'Pajisje portative mbështetëse për kantiere në distancë, punë ndalese dhe instalime të përkohshme.',
          productTypes: {
            'diesel-generators': { title: 'Gjeneratorë dizel', description: 'Komplete gjeneratorësh dizel për energji rezervë, ambiente të përkohshme dhe vazhdimësi kantieri.' },
            'portable-air-compressors': { title: 'Kompresorë portativë ajri', description: 'Kompresorë tërheqës për mjete pneumatike, ekipe shërbimi dhe mbështetje në terren.' },
          },
        },
      },
    },
    'tools-workshop': {
      title: 'Vegla & Punishte',
      shortDescription: 'Vegla profesionale elektrike për punime betoni, instalim dhe ekipe mirëmbajtjeje.',
      description: 'Vegla profesionale dhe pajisje punishteje për kontraktorë instalimi, ekipe shërbimi dhe mbështetje projekti që kanë nevojë për një rrugë furnizimi B2B dhe jo për checkout retail.',
      seoIntro: 'Zbuloni inventarin e punishteve dhe veglave elektrike të strukturuar për kërkesa B2B dhe kërkesa të konsoliduara për ofertë.',
      subcategories: {
        'power-tools': {
          title: 'Vegla elektrike',
          description: 'Vegla elektrike portative për shpim, prishje, instalim dhe mirëmbajtje.',
          productTypes: {
            'rotary-hammers': { title: 'Çekiçë rrotullues', description: 'Vegla të forta shpimi dhe daltimi për beton dhe muraturë.' },
            'drill-drivers': { title: 'Trapano-vithisës', description: 'Trapano-vithisës pa kabllo për ekipe instalimi, shërbimi dhe përdorim në punishte.' },
          },
        },
      },
    },
    'electrical-lighting': {
      title: 'Elektrike & Ndriçim',
      shortDescription: 'Produkte testimi elektrik dhe mbrojtjeje qarku për kontraktorë dhe ekipe objektesh.',
      description: 'Produkte mbështetëse elektrike për instalues, ekipe mirëmbajtjeje dhe blerës prokurimi që kanë nevojë për të dhëna produkti të drejtuara nga specifikimet dhe trajtim RFQ, jo rrjedhë retail për konsumatorin.',
      seoIntro: 'Shikoni produkte testimi elektrik dhe mbrojtjeje përmes një katalogu të strukturuar B2B me rrjedhë të përbashkët ofertash dhe materiale ilustrative lokale.',
      subcategories: {
        'test-protection': {
          title: 'Testim & Mbrojtje',
          description: 'Produkte matjeje elektrike dhe mbrojtjeje me tension të ulët për ekipe teknike.',
          productTypes: {
            'digital-multimeters': { title: 'Multimetra dixhitalë', description: 'Matësa dixhitalë portativë për diagnostikim, mirëmbajtje dhe komisionim.' },
            'miniature-circuit-breakers': { title: 'Automatë miniaturë', description: 'Automatë qarku me tension të ulët për panele, tabela shpërndarjeje dhe furnizime të paketuara.' },
          },
        },
      },
    },
    'plumbing-hydraulic': {
      title: 'Hidraulikë & Tubacione',
      shortDescription: 'Pompa dhe vegla tubacionesh për shërbime kantieri, dewatering dhe ekipe instalimi.',
      description: 'Produkte praktike mbështetëse për hidraulikë dhe tubacione për dewatering, punë shërbimi dhe instalim tubacionesh, të paraqitura në të njëjtën strukturë katalogu të orientuar nga kërkesa si pajisjet më të rënda.',
      seoIntro: 'Kërkoni produkte për transferim uji dhe mbështetje tubacionesh me referenca të qarta për njësinë, përputhshmërinë dhe dokumentet para dërgimit të një kërkese.',
      subcategories: {
        'pumps-pipework': {
          title: 'Pompa & Tubacione',
          description: 'Produkte për lëvizje uji dhe përgatitje tubacionesh për përdorim kontraktori dhe industrial.',
          productTypes: {
            'surface-water-pumps': { title: 'Pompa sipërfaqësore uji', description: 'Pompa portative sipërfaqësore për drenazh kantieri, transferim dhe reagim emergjent.' },
            'pipe-threading-machines': { title: 'Makina filetimi tubash', description: 'Makina filetimi tubash për punishte prodhimi, instalues dhe mirëmbajtje impianti.' },
          },
        },
      },
    },
    'building-materials-chemicals': {
      title: 'Materiale Ndërtimi & Kimikate',
      shortDescription: 'Sisteme ankorimi dhe materiale pllakash të certifikuara për fit-out dhe punime rezistente ndaj zjarrit.',
      description: 'Materiale ndërtimi dhe sisteme kimike të përzgjedhura për blerës profesionistë që kanë nevojë për informacion komercial, trajtim sipas njësisë dhe mbështetje për oferta B2B pa porosi online.',
      seoIntro: 'Shfletoni ankora kimike dhe materiale pllakash rezistente ndaj zjarrit me të dhëna produkti sipas njësisë dhe referenca teknike ilustrative të lidhura me familjet e produkteve.',
      subcategories: {
        'fixings-boards': {
          title: 'Fiksime & Pllaka',
          description: 'Konsumues dhe materiale pllakash për instalim, fit-out dhe punime teknike përfundimi.',
          productTypes: {
            'chemical-anchors': { title: 'Ankora kimike', description: 'Sisteme ankorimi me injektim për fiksime strukturore dhe instalim industrial.' },
            'fire-resistant-boards': { title: 'Pllaka rezistente ndaj zjarrit', description: 'Materiale pllakash për mbrojtje pasive ndaj zjarrit dhe montime të certifikuara të brendshme.' },
          },
        },
      },
    },
    'attachments-spare-parts': {
      title: 'Aksesorë & Pjesë Këmbimi',
      shortDescription: 'Aksesorë makinerish dhe komponentë mbështetës për rritje produktiviteti.',
      description: 'Për kontraktorë dhe menaxherë flote që kanë nevojë për përmirësime produktiviteti ose komponentë zëvendësues, kjo kategori mbulon aksesorë dhe furnizime të lidhura me makinerinë me trajtim të drejtpërdrejtë kërkese.',
      seoIntro: 'Kërkoni aksesorë makinerish dhe komponentë mbështetës të flotës përmes një katalogu frontend të orientuar nga oferta dhe përputhshmëria.',
      subcategories: {
        'machine-attachments': {
          title: 'Aksesorë makinerish',
          description: 'Produkte aksesorësh për eskavatorë dhe platforma të tjera të pajisjeve të rënda.',
          productTypes: {
            'hydraulic-breakers': { title: 'Çekiçë hidraulikë', description: 'Çekiçë prishjeje për eskavatorë dhe flota transportuese.' },
            'excavator-buckets': { title: 'Kova eskavatori', description: 'Kova eskavatori për gërmim të përgjithshëm dhe trajtim materiali me shumicë.' },
          },
        },
      },
    },
    'safety-workwear': {
      title: 'Siguri & Veshje Pune',
      shortDescription: 'PPE dhe kategori veshjesh pune gati për zgjerim të ardhshëm të orientuar nga furnizimi.',
      description: 'Kjo kategori përfshihet si degë reale e taksonomisë edhe pse nuk ka produkte të mbjella në këtë fazë. Ajo duhet të mbështesë kërkesat për furnizim, inventarin e ardhshëm dhe vazhdimësinë e rrugëve që nga lançimi i parë.',
      seoIntro: 'Siguria dhe veshjet e punës do të zgjerohet përmes një modeli kërkese të drejtuar nga furnizimi, me strukturën ilustrative të kategorisë tashmë të disponueshme në katalog.',
      subcategories: {
        'site-safety': {
          title: 'Siguri kantieri',
          description: 'PPE dhe furnizime bazë sigurie për ekipe në terren dhe pajtueshmëri kontraktorësh.',
          productTypes: {
            'hard-hats': { title: 'Kaska mbrojtëse', description: 'Mbrojtëse koke për kantiere aktive ndërtimi dhe ambiente industriale.' },
            'high-visibility-workwear': { title: 'Veshje me dukshmëri të lartë', description: 'Veshje hi-vis për ekipe rruge, logjistike dhe role të ekspozuara në kantier.' },
          },
        },
      },
    },
  },
  faqItems: [
    { question: 'A mund të dërgoj një kërkesë drejtpërdrejt nëpërmjet faqes?', answer: 'Po. Kjo faqe përdoret vetëm për kërkesa, oferta dhe kërkesa kontrate. Rafin merret drejtpërdrejt me blerësit e kompanive pas kontaktit.' },
    { question: 'A janë çmimet përfundimtare?', answer: 'Çmimet e shfaqura dhe çmimet fillestare janë referenca orientuese komerciale. Kushtet përfundimtare mund të varen nga shtrirja e inspektimit, aksesorët e përfshirë, transporti dhe kushtet e kontratës.' },
    { question: 'A mund të inspektoj makineritë para kontratës?', answer: 'Po. Mund të diskutohen takime inspektimi për makineritë e disponueshme, si dhe rishikim shtesë me video ose dokumente kur është e mundur.' },
    { question: 'A mund të kërkoj disa makina njëkohësisht?', answer: 'Po. Lista e kërkesave është krijuar për kërkesa me shumë produkte që ekipet e prokurimit të dërgojnë një kërkesë të vetme të përmbledhur.' },
    { question: 'A bëni dorëzim?', answer: 'Dorëzimi, planifikimi i transportit dhe trajtimi i eksportit mund të diskutohen drejtpërdrejt me Rafin sapo të identifikohet pajisja e nevojshme.' },
    { question: 'Produktet janë të reja apo të përdorura?', answer: 'Të dyja. Listimet mund të jenë të reja, të përdorura ose të rikondicionuara, dhe çdo faqe produkti e tregon qartë gjendjen.' },
    { question: 'Çfarë dokumentesh ofrohen?', answer: 'Në varësi të artikullit, Rafin mund të ofrojë shënime inspektimi, verifikim seriali, përmbledhje shërbimi, fatura dhe dokumente të tjera komerciale përkatëse.' },
    { question: 'Sa shpejt përgjigjet Rafin?', answer: 'Për stok aktiv, Rafin zakonisht përgjigjet shpejt gjatë orarit të punës. Kërkesat komplekse për kontrata ose logjistikë mund të kërkojnë një shqyrtim më të plotë të brendshëm.' },
    { question: 'A mund të kërkoj pjesë këmbimi bashkë me një makineri?', answer: 'Po. Aksesorët, pjesët këmbimi dhe setet e shërbimit mund të shtohen në të njëjtën rrjedhë kërkese me makineritë.' },
    { question: 'A mund të rezervoj makineri?', answer: 'Produktet e zgjedhura mund të kalojnë në status të rezervuar ndërsa diskutimet komerciale janë aktive. Disponueshmëria e rezervimit varet nga produkti dhe kërkesa aktuale.' },
    { question: 'A mbështesni përputhjen e kovës dhe çekiçit për eskavatorë?', answer: 'Po. Rafin mund të diskutojë përshtatjen e aksesorëve, dimensionet e kunjave dhe kërkesat e hidraulikës ndihmëse gjatë procesit të kërkesës.' },
    { question: 'A janë të disponueshme dokumentet e transportit dhe detajet e regjistrimit rrugor?', answer: 'Po. Dokumentet përkatëse të regjistrimit, flotës ose pronësisë mund të shqyrtohen gjatë diskutimit të kontratës, në varësi të mjetit.' },
    { question: 'A mund të kërkoj tabela ngritjeje ose informacion për aksesorët?', answer: 'Po. Tabelat e ngarkesës, informacioni i shtrirjes dhe aksesorët e përfshirë mund të sqarohen nga ekipi i shitjeve gjatë shqyrtimit të kërkesës.' },
    { question: 'A mund të ofrohen pajisjet mbështetëse si paketë?', answer: 'Po. Gjeneratorët, kompresorët, pompat dhe pajisjet e tjera mbështetëse mund të ofrohen si paketa të kombinuara kantieri sipas nevojës.' },
    { question: 'A mund të shtohen pjesët në një ofertë makinerie?', answer: 'Po. Rrjedha e kërkesës mbështet kërkesa të kombinuara që përfshijnë makineri, aksesorë dhe pjesë këmbimi në një dërgim të vetëm.' },
    { question: 'A mbështesni kërkesa të shpejta për vegla dhe punishte?', answer: 'Po. Veglat më të vogla profesionale mund të trajtohen përmes të njëjtës rrugë kërkese B2B, sidomos kur kompanitë kanë nevojë për disa njësi ose dorëzim të kombinuar.' },
    { question: 'A mund të grupohen veglat elektrike dhe pajisjet mbrojtëse në një kërkesë?', answer: 'Po. Pajisjet e testimit, pajisjet mbrojtëse dhe produktet e lidhura mund të ofertohen së bashku në një kërkesë të përmbledhur.' },
    { question: 'A mund të kombinohen pompat dhe veglat e tubacioneve me kërkesat e mbështetjes së kantierit?', answer: 'Po. Pajisjet e pompimit, veglat e tubacioneve dhe produktet e tjera mbështetëse për kontraktorët mund të kombinohen në një dorëzim të vetëm kërkese.' },
    { question: 'A mbështesin listimet e materialeve sasi sipas njësisë dhe kërkesa dokumentacioni?', answer: 'Po. Materialet dhe kimikatet mund të përfshijnë oferta sipas njësisë, kërkesa certifikimi dhe diskutim dorëzimi në të njëjtën rrjedhë frontend.' },
    { question: 'Çfarë ndodh nëse një kategori sigurie nuk ka ende produkte të listuara?', answer: 'Kategoria mbetet aktive për furnizim dhe zgjerim të ardhshëm. Blerësit mund të kërkojnë ende mbështetje ose t’i kërkojnë Rafin të gjejë artikujt përkatës drejtpërdrejt.' },
  ],
  salesContacts: [
    { title: 'Menaxher i shitjeve të makinerive', markets: ['Gërmime', 'Pajisje rrugore', 'Transport'], note: 'Kontakti kryesor për makineri të rënda, planifikim inspektimi dhe negociim ofertash me kompani.' },
    { title: 'Koordinatore e pjesëve dhe aksesorëve', markets: ['Aksesorë', 'Pjesë këmbimi', 'Pajisje të vogla'], note: 'Koordinon konfirmimet e stokut, kontrollin e përputhshmërisë dhe kërkesat e kombinuara makinë plus pjesë.' },
    { title: 'Mbështetje për kontrata dhe dorëzim', markets: ['Kontrata', 'Dorëzim', 'Koordinim eksporti'], note: 'Menaxhon dorëzimin komercial, planifikimin e dorëzimit dhe ndjekjen e dokumenteve të kontratës pas miratimit të blerësit.' },
  ],
  technicalLibraryGroups: {
    manuals: {
      title: 'Manuale produktesh',
      description: 'Manuale përdorimi, udhëzime nisjeje, referenca mirëmbajtjeje dhe instruksione përdorimi të lidhura me familjet ekzistuese të produkteve.',
      items: [
        'Vendmbajtës për manualin e funksionimit të eskavatorit me zinxhirë',
        'Vendmbajtës për udhëzuesin e përdorimit të kompresorit portativ të ajrit',
        'Vendmbajtës për instruksionet e përdorimit të makinës së filetimit të tubave',
      ],
    },
    'spec-sheets': {
      title: 'Fletë specifikimesh',
      description: 'Fletë të dhënash, përmbledhje modelesh, referenca përputhshmërie dhe pasqyra teknike të lidhura me familjet aktuale të produkteve.',
      items: [
        'Vendmbajtës për përmbledhjen e modelit telehandler',
        'Vendmbajtës për referencën e përputhshmërisë së çekiçit hidraulik',
        'Vendmbajtës për pasqyrën teknike të pllakës rezistente ndaj zjarrit',
      ],
    },
    inspection: {
      title: 'Dokumente inspektimi',
      description: 'Përmbledhje gjendjeje, shënime inspektimi, lista kontrolli dhe regjistra rishikimi para dorëzimit për pajisjet dhe mjetet e transportit.',
      items: [
        'Vendmbajtës për listën e kontrollit të inspektimit të eskavatorit me zinxhirë',
        'Vendmbajtës për përmbledhjen e gjendjes së kamionit vetëshkarkues',
        'Vendmbajtës për regjistrin e kontrollit vizual të ngarkuesit me goma',
      ],
    },
    'delivery-contract': {
      title: 'Dokumente dorëzimi dhe kontrate',
      description: 'Referenca të fushës së dorëzimit, përgatitje dorëzimi dhe kërkesa dokumentesh mbështetëse për kontrata në pajisje, vegla dhe materiale.',
      items: [
        'Vendmbajtës për fushën e dorëzimit të rimorkios lowbed',
        'Vendmbajtës për listën e kontrollit të dorëzimit të gjeneratorit',
        'Vendmbajtës për kërkesën komerciale për materiale dhe konsumues',
      ],
    },
    safety: {
      title: 'Dokumente sigurie dhe përdorimi',
      description: 'Shënime sigurie, udhëzime trajtimi, masa paraprake për përdorim në kantier dhe materiale ndërgjegjësimi për operatorët të lidhura me familjet aktive të produkteve.',
      items: [
        'Vendmbajtës për masat paraprake të përdorimit të çekiçit rrotullues',
        'Vendmbajtës për njoftimin e trajtimit të ankorës kimike',
        'Vendmbajtës për udhëzimin e sigurisë në kantier për pompën sipërfaqësore të ujit',
      ],
    },
  },
  products: {
    'prd-001': {
      location: 'Oborri i Tiranës',
      fuelType: 'Naftë',
      capacity: 'kovë 1.2 m3',
      images: { 0: { alt: 'Eskavator Caterpillar me zinxhirë duke punuar në një kantier gërmimi' } },
      excerpt: 'Eskavator crawler gati për kontraktorë për punime të mëdha dheu, hapje kanalesh dhe ndërtim të përgjithshëm civil.',
      description: 'Një listim përfaqësues eskavatori me zinxhirë me specifikime të nivelit komercial, shënime të orientuara nga inspektimi dhe një rrugë të qartë kërkese B2B për blerësit që krahasojnë zgjerimet e flotës.',
      keyFeatures: ['Qark hidraulik ndihmës për mbështetje aksesorësh', 'Kovë standarde e përfshirë në fushën e kërkesës', 'Historiku i inspektimit në terren i disponueshëm sipas kërkesës'],
      specs: {
        0: { label: 'Thellësia e gërmimit', value: '6.7 m' },
        1: { label: 'Lëkundja e pasme', value: 'Rreze standarde' },
        2: { label: 'Shpejtësia e lëvizjes', value: '5.5 km/h' },
      },
      documents: { 0: { title: 'Fletë specifikimesh për eskavatorin me zinxhirë' }, 1: { title: 'Referencë inspektimi' } },
      inspectionNotes: ['Kontrollet e ndezjes në të ftohtë dhe temperaturës së punës u kryen për listimin ilustrues.', 'Konsumimi i pjesës së poshtme dhe gjendja e kunjave të kovës konfirmohen gjatë inspektimit fizik.'],
      tags: ['eskavator-me-zinxhirë', 'punime-dheu', 'stok-i-veçuar'],
    },
    'prd-002': {
      location: 'Oborri tranzit i Durrësit',
      fuelType: 'Naftë',
      capacity: 'kovë 0.16 m3',
      images: { 0: { alt: 'Mini-eskavator kompakt i parkuar në një kantier me zhavorr' } },
      excerpt: 'Eskavator kompakt për utilitete, peizazh dhe projekte me akses urban ku gjurma ka rëndësi.',
      description: 'Një opsion kompakt gërmimi për blerësit që kanë nevojë për performancë të transportueshme dhe akses në kantiere me rreze të ngushtë pa humbur përputhshmërinë me aksesorët ose rrjedhën e dokumentacionit komercial.',
      keyFeatures: ['Profil zero-tail-swing i përshtatshëm për vende të kufizuara', 'Konfigurim hidraulik gati për quick-coupler', 'Stok në ardhje me rishikim komercial pas mbërritjes'],
      specs: {
        0: { label: 'Thellësia e gërmimit', value: '3.6 m' },
        1: { label: 'Gjerësia totale', value: '1,960 mm' },
        2: { label: 'Fluksi ndihmës', value: '61.6 L/min' },
      },
      documents: { 0: { title: 'Fletë të dhënash për mini-eskavatorin' } },
      inspectionNotes: ['Njësi ilustrative në ardhje, në pritje të kontrollit fizik në magazinë.', 'Përmbledhja përfundimtare e gjendjes dhe paketa e shënimeve të servisit do të bashkëngjiten pas pranimit.'],
      tags: ['mini-eskavator', 'kantier-kompakt', 'stok-ne-ardhje'],
    },
    'prd-003': {
      location: 'Oborri i Tiranës',
      fuelType: 'Naftë',
      capacity: 'kovë ngarkuese 1.0 m3',
      transmission: 'Powershift',
      images: { 0: { alt: 'Backhoe loader JCB i pozicionuar në një kantier ndërtimi' } },
      excerpt: 'Makineri shumëfunksionale për hapje kanalesh, ngarkim, mirëmbajtje bashkiake dhe ekipe shërbimi kontraktore.',
      description: 'Ky listim përfaqësues backhoe loader u përshtatet blerësve që kanë nevojë për një makineri të gjithanshme për detyra të përziera dhe duan një rrugë të drejtpërdrejtë kërkese për inspektim dhe rishikim komercial.',
      keyFeatures: ['Konfigurim me kovë të përparme 4-në-1', 'Komanda pilot për përdorim të shumëanshëm në kantier', 'Statusi i rezervuar e mban listimin të dukshëm ndërsa diskutimet mbeten aktive'],
      specs: {
        0: { label: 'Thellësia e gërmimit të backhoe', value: '5.5 m' },
        1: { label: 'Kapaciteti ngritës i ngarkuesit', value: '3,400 kg' },
        2: { label: 'Konfigurimi i lëvizjes', value: '4x4' },
      },
      documents: { 0: { title: 'Përmbledhje për backhoe loader' } },
      inspectionNotes: ['Listim ilustrues i rezervuar në pritje të rezultatit të kërkesës aktuale.', 'Rrjedhjet hidraulike dhe konsumimi i gomave do të verifikohen gjatë kontrollit fizik.'],
      tags: ['backhoe-loader', 'flote-utilitare', 'i-rezervuar'],
    },
    'prd-004': {
      location: 'Oborri i agregateve në Elbasan',
      fuelType: 'Naftë',
      capacity: 'kovë 3.5 m3',
      transmission: 'Powershift automatik',
      images: { 0: { alt: 'Ngarkues me goma Volvo në një oborr pajisjesh të rënda' } },
      excerpt: 'Ngarkues me goma i kategorisë së mesme i konfiguruar për trajtim stoqesh, cikle ngarkimi dhe operacione agregatesh.',
      description: 'Një listim ngarkuesi me goma i fokusuar te blerësit e impianteve, guroreve dhe kontraktorëve që kanë nevojë për ngarkesë, komoditet të operatorit dhe fleksibilitet komercial më shumë sesa porosi online.',
      keyFeatures: ['Ride control për lëvizje më të butë të kovës', 'Diskutimi për aksesorë ngarkuesi dhe pirunë mbështetet gjatë kërkesës', 'Çmimi komercial mbahet i drejtpërdrejtë për shkak të variacioneve të konfigurimit'],
      specs: {
        0: { label: 'Ngarkesa statike e përmbysjes', value: '13,000 kg' },
        1: { label: 'Forca e shkëputjes', value: '171 kN' },
        2: { label: 'Madhësia e gomave', value: '23.5 R25' },
      },
      documents: { 0: { title: 'Fletë produkti për ngarkuesin me goma' } },
      inspectionNotes: ['Ngarkues ilustrues gati për planifikim të verifikimit në vend.', 'Konsumimi i tehut të kovës dhe gjendja e gomave dokumentohen sipas kërkesës.'],
      tags: ['ngarkues-me-goma', 'oborr-agregatesh', 'cmim-sipas-kerkeses'],
    },
    'prd-005': {
      location: 'Oborri i Tiranës',
      fuelType: 'Naftë',
      capacity: 'gjerësi daulle 2,130 mm',
      images: { 0: { alt: 'Rul rrugor me një daulle duke ngjeshur asfaltin' } },
      excerpt: 'Platformë ngjeshjeje me një daulle për punime rrugore, argjinatura dhe programe përgatitjeje kantieri.',
      description: 'Një listim përfaqësues për ngjeshje toke i krijuar për kontraktorë dhe blerës të punëve publike që kanë nevojë për kontekst mbi orët e punës dhe një rrjedhë të drejtpërdrejtë RFQ.',
      keyFeatures: ['Konfigurim i lëmuar i daulles për punë me nënbazë masive', 'Deklarim i qartë i orëve të punës për krahasim prokurimi', 'Status i gatshëm tani për afate më të shkurtra projekti'],
      specs: {
        0: { label: 'Forca centrifugale', value: '256 kN' },
        1: { label: 'Shpejtësia e lëvizjes', value: '11 km/h' },
        2: { label: 'Kapërcimi i pjerrësisë', value: '56%' },
      },
      documents: { 0: { title: 'Referencë specifikimesh për rul' } },
      inspectionNotes: ['Modalitetet e vibrimit dhe gjendja e guaskës së daulles konfirmohen gjatë inspektimit fizik.'],
      tags: ['rul', 'ngjeshje', 'i-disponueshem-tani'],
    },
    'prd-006': {
      location: 'Oborri i Tiranës',
      fuelType: 'Naftë',
      capacity: 'ngritje maksimale 4,000 kg',
      transmission: 'Hidrostatik',
      images: { 0: { alt: 'Telehandler JCB duke ngritur materiale pranë një ndërtese skelet' } },
      excerpt: 'Telehandler për terren të vështirë për lëvizje paletash, punime çatie dhe logjistikë të përgjithshme kantieri.',
      description: 'Një listim i fokusuar te shtrirja për blerësit që krahasojnë lartësinë e ngritjes, fleksibilitetin e manovrimit në kantier dhe mbështetjen e kombinuar për kërkesa për pirunë, kova ose aksesorë të tjerë.',
      keyFeatures: ['Karrocë pirunësh e konfiguruar për trajtim materialesh', 'Rast përdorimi me shtrirje të lartë për mbështetje strukturore dhe çatie', 'Paketa komerciale mund të përfshijë diskutim për aksesorë'],
      specs: {
        0: { label: 'Lartësia e ngritjes', value: '16.7 m' },
        1: { label: 'Shtrirja përpara', value: '12.5 m' },
        2: { label: 'Stabilizatorët', value: 'Stabilizatorë të përparmë të instaluar' },
      },
      documents: { 0: { title: 'Përmbledhje produkti për telehandler' } },
      inspectionNotes: ['Jastëkët e konsumit të boom-it dhe funksionimi i stabilizatorëve do të rishikohen gjatë inspektimit.'],
      tags: ['telehandler', 'ngritje-akses', 'stok-i-veçuar'],
    },
    'prd-007': {
      location: 'Oborri i flotës në Durrës',
      fuelType: 'Naftë',
      capacity: 'karroceri vetëshkarkuese 16 m3',
      transmission: 'Manual i automatizuar',
      images: { 0: { alt: 'Kamion vetëshkarkues i rëndë në një rrugë transporti ndërtimi' } },
      excerpt: 'Kamion vetëshkarkues rrugor për transport dherash, lëvizje materiali dhe përdorim në flotë të përzier.',
      description: 'Një listim përfaqësues kamioni vetëshkarkues me transparencë kilometrazhi, specifikime të orientuara nga transporti dhe ndjekje kontrate offline të integruar në rrjedhën e produktit.',
      keyFeatures: ['Karroceri e rëndë vetëshkarkuese për agregate dhe dhera', 'Kilometrazhi dhe konteksti i transmetimit i dukshëm që në pamjen e parë', 'I përshtatshëm për blerësit që konsolidojnë kërkesat për transport dhe makineri'],
      specs: {
        0: { label: 'Konfigurimi i akseve', value: '8x4' },
        1: { label: 'Lloji i karrocerisë', value: 'Vetëshkarkuese e pasme' },
        2: { label: 'Standardi i emetimit', value: 'Euro 6' },
      },
      documents: { 0: { title: 'Përmbledhje për mjetin e flotës' } },
      inspectionNotes: ['Dokumentet e qarkullimit rrugor dhe historia e flotës ndahen gjatë rishikimit komercial.'],
      tags: ['kamion-veteshkarkues', 'flote-transporti', 'i-disponueshem-tani'],
    },
    'prd-008': {
      location: 'Oborri i flotës në Durrës',
      capacity: 'gjatësi platforme 8.5 m',
      images: { 0: { alt: 'Rimorkio lowbed e konfiguruar për transport pajisjesh të rënda' } },
      excerpt: 'Rimorkio transporti makinerish për eskavatorë, ngarkues dhe pajisje kontraktore jashtë përmasave.',
      description: 'Një listim i fokusuar te transporti për blerësit që planifikojnë lëvizje makinerish, logjistikë impianti dhe mobilizim projekti përmes të njëjtës rrjedhë kërkese si asetet e pajisjeve.',
      keyFeatures: ['Konfigurim drop-deck për transport pajisjesh të rënda', 'Rampat e ngarkimit dhe gjendja e platformës konfirmohen gjatë shqyrtimit', 'Çmimi mbahet offline për shkak të variacioneve të konfigurimit dhe paketës'],
      specs: {
        0: { label: 'Akset', value: '3' },
        1: { label: 'Lartësia e platformës', value: '900 mm' },
        2: { label: 'Lloji i rampës', value: 'Me asistencë hidraulike' },
      },
      documents: { 0: { title: 'Përmbledhje konfigurimi për rimorkion' } },
      inspectionNotes: ['Konsumimi i platformës, gomat dhe statusi i sistemit të frenimit rishikohen gjatë inspektimit.'],
      tags: ['rimorkio-lowbed', 'transport-makinerish', 'cmim-sipas-kerkeses'],
    },
    'prd-009': {
      location: 'Magazina e Tiranës',
      fuelType: 'Naftë',
      enginePower: '220 kVA rezervë',
      capacity: 'depozitë karburanti 1,000 L',
      images: { 0: { alt: 'Gjenerator dizel i mbuluar në një ambient të jashtëm pune' } },
      excerpt: 'Komplet gjeneratori i mbuluar për energji rezervë kantieri, ambiente të përkohshme dhe vazhdimësi energjie.',
      description: 'Një listim për energji të përkohshme i krijuar për ekipe projekti që kanë nevojë për një rrugë të qartë për pajisje mbështetëse brenda të njëjtit katalog kërkesash si makineritë dhe aksesorët.',
      keyFeatures: ['Paketë e mbuluar e përshtatshme për përdorim të jashtëm kontraktori', 'Aksesorët ATS dhe shpërndarës mund të përfshihen përmes kërkesës', 'Listim ilustrues me stok magazine dhe mundësi diskutimi për dorëzim lokal'],
      specs: {
        0: { label: 'Fuqia kryesore', value: '200 kVA' },
        1: { label: 'Frekuenca', value: '50 Hz' },
        2: { label: 'Tensioni', value: '400/230 V' },
      },
      documents: { 0: { title: 'Përmbledhje teknike për gjeneratorin' }, 1: { title: 'Paketë ilustrative pajtueshmërie' } },
      inspectionNotes: ['Njësi ilustrative me stok magazine; seriali final dhe regjistri i testit lidhen sipas artikullit aktiv.'],
      tags: ['gjenerator-dizel', 'energji-e-perkohshme', 'i-disponueshem-tani'],
    },
    'prd-010': {
      location: 'Oborri i Tiranës',
      fuelType: 'Naftë',
      capacity: '5.0 m3/min @ 7 bar',
      images: { 0: { alt: 'Kompresor portativ ajri i tërheqshëm në një kantier ndërtimi' } },
      excerpt: 'Kompresor i tërheqshëm për mjete pneumatike, ekipe mirëmbajtjeje dhe mbështetje të përkohshme në terren.',
      description: 'Një listim kompakt pajisjeje mbështetëse për blerësit që kombinojnë furnizimin me ajër në kantier me mjete, makineri ose kërkesa për energji të përkohshme.',
      keyFeatures: ['Shasi e tërheqshme për vendosje në terren', 'Listim përfaqësues stoku me pak orë pune', 'I përshtatshëm për ekipe civile dhe mirëmbajtje impianti'],
      specs: {
        0: { label: 'Presioni i punës', value: '7 bar' },
        1: { label: 'Fluksi i ajrit', value: '5.0 m3/min' },
        2: { label: 'Koka e tërheqjes', value: 'Paketë tërheqjeje rrugore' },
      },
      documents: { 0: { title: 'Përmbledhje për kompresorin portativ' } },
      inspectionNotes: ['Zhurma, lidhëset e zorrëve dhe intervalet e servisit rishikohen gjatë diskutimit të dorëzimit.'],
      tags: ['kompresor-portativ-ajri', 'mbeshtetje-kantieri', 'oferte'],
    },
    'prd-011': {
      location: 'Magazina e Tiranës',
      enginePower: '1,500 W',
      capacity: 'energji goditjeje 12.5 J',
      images: { 0: { alt: 'Çekiç rrotullues i vendosur mbi një sipërfaqe punishteje' } },
      excerpt: 'Çekiç rrotullues profesional për shpim ankora, daltim dhe depërtim në beton në kantiere aktive.',
      description: 'Një listim veglash i orientuar drejt profesionistëve për kontraktorë dhe ekipe mirëmbajtjeje që kanë nevojë për vegla punishteje dhe kantieri të trajtuara në të njëjtën rrjedhë kërkese si pajisjet më të mëdha.',
      keyFeatures: ['Mbajtëse SDS max për shpime të rënda', 'I përshtatshëm për kërkesa të kombinuara me ankora dhe vegla elektrike', 'Listim ilustrues me stok magazine dhe mbështetje komerciale lokale'],
      specs: {
        0: { label: 'Mbajtësja e veglës', value: 'SDS max' },
        1: { label: 'Diametri maksimal i shpimit', value: '45 mm beton' },
        2: { label: 'Burimi i energjisë', value: 'Elektrik me kabllo' },
      },
      documents: { 0: { title: 'Fletë produkti për çekiçin rrotullues' } },
      inspectionNotes: ['Disponueshmëri e menjëhershme stoku për listimin ilustrues.'],
      tags: ['cekic-rrotullues', 'vegla-elektrike', 'stok-magazine'],
    },
    'prd-012': {
      location: 'Magazina e Tiranës',
      enginePower: 'ekuivalent 820 W',
      capacity: 'çift rrotullues 95 Nm',
      images: { 0: { alt: 'Trapano-vithisës pa kabllo i paraqitur në profil' } },
      excerpt: 'Trapano-vithisës me goditje pa kabllo për ekipe instalimi, MEP dhe mbështetje punishteje.',
      description: 'Një listim praktik veglash punishteje për kontraktorët që kanë nevojë për kapacitet kompakt shpimi dhe duan të kombinojnë kërkesat për vegla, aksesorë dhe konsumues në një rrjedhë të vetme B2B.',
      keyFeatures: ['Transmision me tre shpejtësi për përdorim të përzier vidhosjeje dhe shpimi', 'I përputhshëm me planifikimin e platformave të baterive për kontraktorë', 'Artikull i dobishëm shoqërues për ankora dhe instalime elektrike'],
      specs: {
        0: { label: 'Platforma e tensionit', value: '18 V' },
        1: { label: 'Madhësia e mandrinës', value: 'Mandrinë metalike 13 mm' },
        2: { label: 'Burimi i energjisë', value: 'Pa kabllo' },
      },
      documents: { 0: { title: 'Përmbledhje teknike për trapano-vithisësin' } },
      inspectionNotes: ['Artikull ilustrues me stok magazine dhe konfirmim lote në fazën e ofertës.'],
      tags: ['trapano-vithises', 'vegla-elektrike', 'instalim'],
    },
    'prd-013': {
      location: 'Magazina e Tiranës',
      capacity: '600 V CAT III',
      images: { 0: { alt: 'Multimetër dixhital i përdorur për testime elektrike' } },
      excerpt: 'Multimetër profesional për diagnostikim në terren, mirëmbajtje dhe komisionim elektrik.',
      description: 'Një listim kompakt testimi elektrik i përshtatshëm për ekipe objektesh, instalues dhe ekipe shërbimi që kanë nevojë për mbështetje prokurimi B2B dhe jo rrjedhë retail për njësi të vetme.',
      keyFeatures: ['Mbështetje për tension pa kontakt për kontrolle më të shpejta në terren', 'Kategori matëse e përshtatshme për përdorim profesional', 'Mund të ofertohet së bashku me pajisje mbrojtëse dhe aksesorë'],
      specs: {
        0: { label: 'Kategoria e matjes', value: 'CAT III 600 V' },
        1: { label: 'Ekrani', value: 'Dixhital me ndriçim' },
        2: { label: 'Seti i funksioneve', value: 'Tension, rrymë, rezistencë, vazhdimësi' },
      },
      documents: { 0: { title: 'Fletë produkti për multimetrin' } },
      inspectionNotes: ['Stoku i magazinës dhe dokumentacioni i kalibrimit konfirmohen gjatë fazës së kërkesës.'],
      tags: ['multimeter-dixhital', 'testim-elektrik', 'i-disponueshem-tani'],
    },
    'prd-014': {
      location: 'Magazina e Tiranës',
      unitOfMeasure: 'copë',
      capacity: 'C16 1P',
      images: { 0: { alt: 'Automat miniaturë i fotografuar si referencë produkti' } },
      excerpt: 'Pajisje mbrojtjeje me tension të ulët për montues panelesh, instalues dhe kërkesa furnizimi mirëmbajtjeje.',
      description: 'Një listim elektrik sipas njësisë që e mban faqen vetëm me kërkesa, duke mbështetur njëkohësisht të dhëna të qarta produkti B2B për ekipet e prokurimit teknik.',
      keyFeatures: ['Format i zakonshëm MCB i gatshëm për kontraktorë për punë panelesh dhe shpërndarjeje', 'Shitet si copë me mbështetje për kërkesa në sasi', 'Mund të përfshihet në kërkesa të përziera me vegla dhe pajisje testimi'],
      specs: {
        0: { label: 'Rryma nominale', value: '16 A' },
        1: { label: 'Polet', value: '1P' },
        2: { label: 'Kapaciteti i ndërprerjes', value: '10 kA' },
      },
      documents: { 0: { title: 'Fletë produkti për MCB' }, 1: { title: 'Paketë ilustrative pajtueshmërie' } },
      inspectionNotes: ['Disponueshmëria e lotit dhe afati i dorëzimit konfirmohen në fazën e kërkesës.'],
      tags: ['automat-miniature', 'mbrojtje-elektrike', 'sipas-njesise'],
    },
    'prd-015': {
      location: 'Magazina e Tiranës',
      fuelType: 'Benzinë',
      capacity: '1,210 L/min',
      images: { 0: { alt: 'Pompë portative sipërfaqësore uji e lidhur për përdorim në terren' } },
      excerpt: 'Pompë portative sipërfaqësore uji për drenazh, transferim dhe reagim emergjent në kantier.',
      description: 'Një listim mbështetës për hidraulikë për ekipet e projektit që kanë nevojë për menaxhim portativ të ujit dhe duan pompa, zorrë dhe produkte të lidhura mbështetëse në të njëjtën shportë kërkesash.',
      keyFeatures: ['Kornizë portative për operacione drenazhi dhe transferimi', 'E përshtatshme për paketa reagimi emergjent për kontraktorë', 'Mund të kombinohet me pajisje mbështetëse kantieri në një RFQ të vetme'],
      specs: {
        0: { label: 'Hyrja / Dalja', value: '3 in' },
        1: { label: 'Lartësia maksimale', value: '27 m' },
        2: { label: 'Trajtimi i materialeve të ngurta', value: 'Deri në 28 mm' },
      },
      documents: { 0: { title: 'Fletë teknike për pompën sipërfaqësore' } },
      inspectionNotes: ['Njësi me stok magazine dhe paketë aksesorësh finale e konfirmuar në fazën e ofertës.'],
      tags: ['pompe-siperfaqesore-uji', 'dewatering', 'mbeshtetje-kantieri'],
    },
    'prd-016': {
      location: 'Magazina e Tiranës',
      enginePower: '1,700 W',
      capacity: 'tuba nga 0.5 in deri në 2 in',
      images: { 0: { alt: 'Makina e filetimit të tubave si grafikë ilustruese për furnizim produkti' } },
      excerpt: 'Makineri filetimi tubash për punishte, mbështetje prodhimi dhe ekipe mirëmbajtjeje impianti.',
      description: 'Një listim profesional veglash tubacionesh që përshtatet me të njëjtën rrjedhë frontend kërkesash si pajisjet më të rënda të kantierit, pa sjellë sjellje checkout ose karroce.',
      keyFeatures: ['Mbështetje filetimi për punishte dhe ekipe tubacionesh kontraktore', 'E përshtatshme për kërkesa të kombinuara mjetesh punishteje', 'Stok në ardhje me rishikim komercial pas mbërritjes'],
      specs: {
        0: { label: 'Kapaciteti i filetimit', value: '0.5 in deri në 2 in' },
        1: { label: 'Lloji i drejtimit', value: 'Motor elektrik' },
        2: { label: 'Montimi', value: 'E përputhshme me bankë dhe stativ' },
      },
      documents: { 0: { title: 'Referencë për makinën e filetimit të tubave' } },
      inspectionNotes: ['Listim ilustrues në ardhje, në pritje të pranimit në magazinë dhe konfirmimit të serialit.'],
      tags: ['makine-filetimi-tubash', 'vegla-punishteje', 'stok-ne-ardhje'],
    },
    'prd-017': {
      location: 'Magazina e Tiranës',
      unitOfMeasure: 'kartush',
      capacity: '390 ml',
      images: { 0: { alt: 'Kartush ankorimi kimik dhe vida si grafikë ilustruese' } },
      excerpt: 'Sistem ankorimi kimik me injektim për fiksime strukturore dhe ekipe instalimi që kërkojnë mbështetje të dokumentuar.',
      description: 'Një listim konsumabël sipas njësisë për blerës komercialë që kanë nevojë për të dhëna fiksimesh të drejtuara nga specifikimet dhe trajtim të konsoliduar ofertash për materiale, vegla dhe aksesorë instalimi.',
      keyFeatures: ['Paketuar sipas kartushit për ofertim sipas njësisë', 'I përshtatshëm për aplikime fiksimi strukturor sipas miratimit inxhinierik', 'Mund të kombinohet me vegla shpimi në një kërkesë të vetme'],
      specs: {
        0: { label: 'Lloji i rrëshirës', value: 'Llaç epoksi' },
        1: { label: 'Njësia', value: 'kartush 390 ml' },
        2: { label: 'Aplikimi', value: 'Beton dhe fiksime strukturore' },
      },
      documents: { 0: { title: 'Fletë produkti për ankorën kimike' }, 1: { title: 'Paketë ilustrative certifikimi' } },
      inspectionNotes: ['Detajet e lotit, afatit të përdorimit dhe paketës së dorëzimit konfirmohen sipas kërkesës.'],
      tags: ['ankore-kimike', 'kimikate-ndertimi', 'sipas-njesise'],
    },
    'prd-018': {
      location: 'Magazina e Tiranës',
      unitOfMeasure: 'fletë',
      capacity: '1200 x 2000 x 20 mm',
      images: { 0: { alt: 'Pllakë rezistente ndaj zjarrit si grafikë ilustruese për furnizim produkti' } },
      excerpt: 'Pllakë mbrojtjeje pasive ndaj zjarrit për montime teknike të brendshme dhe paketa ndërtimi të certifikuara.',
      description: 'Një listim i kategorisë së materialeve për blerës profesionistë që kanë nevojë për të dhëna sipas njësisë, referenca ilustrative certifikimi dhe mbështetje prokurimi të orientuar nga kërkesa në vend të porosive direkte online.',
      keyFeatures: ['Shitet sipas fletës me mbështetje për sasi projekti', 'E përshtatshme për montime pasive kundër zjarrit', 'Trajtimi komercial mbetet i orientuar nga oferta për kërkesat më të mëdha materiale'],
      specs: {
        0: { label: 'Madhësia e pllakës', value: '1200 x 2000 mm' },
        1: { label: 'Trashësia', value: '20 mm' },
        2: { label: 'Njësia', value: 'Fletë' },
      },
      documents: { 0: { title: 'Fletë produkti për pllakën kundër zjarrit' }, 1: { title: 'Paketë ilustrative certifikimi' } },
      inspectionNotes: ['Loti i materialit, sasitë në paletë dhe trajtimi i transportit konfirmohen gjatë ndjekjes së ofertës.'],
      tags: ['pllake-rezistente-ndaj-zjarrit', 'materiale-ndertimi', 'sipas-njesise'],
    },
    'prd-019': {
      location: 'Oborri i Tiranës',
      capacity: 'gamë transportuesi 18-32 t',
      images: { 0: { alt: 'Çekiç hidraulik i montuar në një eskavator gjatë punimeve të prishjes' } },
      excerpt: 'Çekiç i montuar në eskavator për prishje, mbështetje guroreje dhe punë produktiviteti në materiale të forta.',
      description: 'Një listim aksesorësh i ndërtuar rreth diskutimit të përputhshmërisë, përputhjes me transportuesin dhe rishikimit të drejtpërdrejtë komercial në vend të shitjeve vetëshërbyese të aksesorëve.',
      keyFeatures: ['Përshtatshmëria me transportuesin trajtohet përmes shqyrtimit të kërkesës', 'Mund të çiftëzohet me kërkesa për eskavatorë në të njëjtën listë oferte', 'Çmimi mbahet offline për shkak të variacioneve të montimit dhe paketës'],
      specs: {
        0: { label: 'Gama e transportuesit', value: 'eskavatorë 18-32 t' },
        1: { label: 'Diametri i veglës', value: '135 mm' },
        2: { label: 'Fluksi i vajit', value: '170-240 L/min' },
      },
      documents: { 0: { title: 'Përmbledhje për përputhshmërinë e çekiçit' } },
      inspectionNotes: ['Konsumimi i bushings, gjendja e veglës dhe detajet e suportit të montimit ndahen gjatë kërkesës.'],
      tags: ['cekic-hidraulik', 'aksesore', 'rishikim-perputhshmerie'],
    },
    'prd-020': {
      location: 'Oborri i Tiranës',
      unitOfMeasure: 'njësi',
      capacity: '1.2 m3',
      images: { 0: { alt: 'Kovë eskavatori e fotografuar mbi sfond neutral' } },
      excerpt: 'Kovë eskavatori për përdorim të përgjithshëm për punime dheu, ngarkim dhe paketa aksesorësh për flotë.',
      description: 'Një listim kove i menduar për blerësit që kombinojnë aksesorët me makinat pritëse ose kërkojnë komponentë mbështetës të flotës përmes të njëjtit proces kërkese B2B.',
      keyFeatures: ['Profil gërmimi për përdorim të përgjithshëm', 'Mund të ofrohet me rishikim kunjash dhe lidhjesh për transportuesin përkatës', 'Çmimi i dukshëm përdoret vetëm si referencë frontend'],
      specs: {
        0: { label: 'Gjerësia e kovës', value: '1,450 mm' },
        1: { label: 'Kapaciteti', value: '1.2 m3' },
        2: { label: 'Aplikimi', value: 'Lëvizje e përgjithshme dheu' },
      },
      documents: { 0: { title: 'Referencë për përputhshmërinë e kovës' } },
      inspectionNotes: ['Dimensionet e kunjave, detajet e lidhjeve dhe paketa opsionale e dhëmbëve konfirmohen gjatë kërkesës.'],
      tags: ['kove-eskavatori', 'aksesore', 'mbeshtetje-flote'],
    },
  },
} as const;
