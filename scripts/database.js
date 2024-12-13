const dogs = [
    {id: 1, type: 'dog', info: 'žiadne', name: 'Max', size: 'malá', sex: 'pes', photo: 'images/dogs/dog1.jpg', age: '3 roky', shelterDuration: '3 roky',
    description: 'Max je malý, no odvážny psík, ktorý si rýchlo získa vaše srdce. ' +
        'Má 3 roky, je plný energie a radosti zo života. Max miluje spoločnosť ľudí, prechádzky na čerstvom vzduchu ' +
        'a objavovanie nových zákutí. Napriek svojej malej veľkosti má veľké srdce, pripravené ponúknuť nekonečnú lásku.\n' +
        '\n' + 'Max je ideálny spoločník do bytu či domu, kde nájde pokojný kútik, no zároveň bude mať dostatok možností na pohyb a hranie ❤️\n' + '\n'
    },
    { id: 2, type: 'dog', info: 'má rada deti', name: 'Bella', size: 'stredná', sex: 'fenka', photo: 'images/dogs/dog2.jpg', age: '2 roky', shelterDuration: '2 roky',
        description: 'Bella je krásna 2-ročná stredne veľká fenka, ktorá hľadá svoj nový domov. ' +
            'Srdcom je hravá a plná energie, no zároveň aj veľmi milá a priateľská. ' +
            'Má skvelý temperament, ktorý si získa každého, kto si ju zamiluje. Je to ideálny spoločník pre aktívnych ľudí alebo rodiny, ' +
            'ktoré majú radi pohyb a čas strávený vonku. Bella je tiež veľmi starostlivá a verná, takže bude úžasnou členkou vašej rodiny.\n' + '\n' +
            'Súčasťou jej osobnosti je aj chuť sa učiť a vykonávať rôzne triky, takže bude potešením jej venovať čas' +
            ' a pozornosť. Získať si jej dôveru je jednoduché – stačí jej venovať lásku a starostlivosť, a Bella vám to vráti s úžasnou vernosťou.'
    },
    { id: 3, type: 'dog', info: 'žiadne', name: 'Charlie', size: 'malá', sex: 'pes', photo: 'images/dogs/dog3.jpg', age: '4 roky', shelterDuration: '1,5 roka',
    description: 'Charlie je roztomilý 4-ročný malý psík s bielou srsťou, ktorý si získa srdce každého. ' +
        'Tento veselý a hravý pes je ideálny pre tých, ktorí hľadajú priateľského a verného spoločníka. ' +
        'Charlie je plný energie a obľubuje spoločnosť, ale dokáže byť aj pokojný a láskyplný, keď je čas na relax. ' +
        'Predtým bol u jednej staršej pani, ktorá sa o neho starala, no teraz hľadá nový domov, kde bude opäť milovaný a obklopený pozornosťou. ' +
        'Ako malý psík je ideálny aj do menších priestorov, a je veľmi vďačný za lásku a starostlivosť, ktorú dostáva. '
    },
    { id: 4,type: 'dog', info: 'iba venčiteľky', name: 'Lucy', size: 'veľká', sex: 'fenka', photo: 'images/dogs/dog4.jpg', age: '5 rokov', shelterDuration: '3 roky',
    description: 'Lucy je 5-ročná veľká fenka so zlatistou srsťou, ktorá prešla ťažkým životom. ' +
        'Predtým bola zneužívaná, čo sa na nej podpísalo, a preto sa bojí mužov. ' +
        'Napriek tomu, že bola terorizovaná, má veľké srdce a po chvíli dôvery dokáže byť veľmi láskavá a oddaná. ' +
        'Momentálne je už 3 roky v útulku, kde si našla svoj pokoj, ale stále hľadá domov, kde by mohla prežiť šťastný a bezpečný život. ' +
        'Hoci sa bojí nových vecí, má veľký potenciál stať sa vernou kamarátkou pre niekoho, kto jej dá čas a trpezlivosť. ' +
        'Lucy si zaslúži druhú šancu a lásku, ktorú jej život zatial odoprel.'
    },
    { id: 5, type: 'dog', info: 'žiadne', name: 'Daisy', size: 'stredná', sex: 'fenka', photo: 'images/dogs/dog5.jpg', age: '1 rok' ,shelterDuration: '1 rok',
    description: 'Daisy je mladá, 1-ročná stredná fenka, ktorá je v útulku od svojho narodenia. ' +
        'Je to veľmi láskavá a prítulná fenka, ktorá túži po ľudskom kontakte a spoločnosti. ' +
        'Je veľmi prítulná a rada sa nechá držať na rukách, čo jej dodáva pocit bezpečia a lásky. ' +
        'Daisy je hravá a energická, miluje byť v spoločnosti ľudí a iných zvierat. ' +
        'Je ideálnym spoločníkom pre niekoho, kto hľadá oddaného priateľa na celý život.'
    },
    { id: 6, type: 'dog', info: 'žiadne', name: 'Draco', size: 'veľká', sex: 'pes', photo: 'images/dogs/dog6.jpg', age: '3 roky', shelterDuration: '3 roky',
        description: 'Draco je krásny trojročný hasky, ktorý svojou veľkosťou a silnou postavou okamžite zaujme. ' +
            'Tento psík je nielen veľký, ale aj veľmi charizmatický, predovšetkým vďaka svojim úchvatným očiam, ktoré vás doslova očaria. ' +
            'Je to pravý zástupca plemena hasky, s hustou srsťou a elegantným vzhľadom.' +
            ' Draco je pes, ktorý si získa srdcia každého, kto sa na neho pozrie, a je ideálnym spoločníkom pre tých, ktorí hľadajú verného ' +
            'a energického priateľa. Ak máte radi psy s výraznými očami a veľkým srdcom, Draco je ideálny pre vás!'
    },
    { id: 7, type: 'dog', info: 'vhodná k malým deťom', name: 'Viki', size: 'malá', sex: 'fenka', photo: 'images/dogs/dog7.jpg', age: '1 rok', shelterDuration: '1 rok',
    description: 'Viki je malá, ale veľmi pôvabná fenka, ktorá si získa každého svojím šarmom. ' +
        'Tento jednoročný krásny hnedý psík je plný energie a radosti. ' +
        'Je to veselý a hravý spoločník, ktorý si získa vaše srdce svojou prítulnosťou a nežnosťou. ' +
        'Napriek svojej malej veľkosti má Viki veľké osobnosť a vždy vie, ako rozveseliť svojich majiteľov. ' +
        'Je ideálna pre tých, ktorí hľadajú malého, no veľmi milého a aktívneho psa.'
    },
    { id: 8, type: 'dog', info: 'žiadne', name: 'Leila', size: 'veľká', sex: 'fenka', photo: 'images/dogs/dog8.jpg', age: '4 roky' , shelterDuration: '4 roky',
    description: 'Leila je impozantná štvorročná fenka s krásnou hnedo-čiernou srsťou, ktorá jej dodáva elegantný vzhľad. ' +
        'Tento väčší pes sa môže pochváliť silnou a atletickou postavou, no napriek svojej veľkosti je veľmi priateľská a láskavá. ' +
        'Leila je plná energie a pripravená na každú zábavu, no zároveň je aj pokojná a verná spoločníčka, ' +
        'ktorá sa rada mazlí. Je ideálna pre aktívnych majiteľov, ktorí hľadajú psíka s vyváženou povahou' +
        ' – dostatok energie na hranie, ale aj dostatok lásky na spoločné chvíle.'
    },
    { id: 9,type: 'dog', info: 'bojí sa veľmi hlučných miest', name: 'Gimy', size: 'stredná', sex: 'pes', photo: 'images/dogs/dog9.jpg', age: '1 rok' , shelterDuration: 'pol roka',
    description: 'Gimy je mladý, jedenročný pes so strednou veľkosťou, ktorý si získal srdcia mnohých. ' +
        'S jeho krásnou srsťou, ktorá je zdobená hnedými škvrnami, je jedinečný a nezameniteľný. ' +
        'Gimy trávi už pol roka v útulku, kde si vybudoval silný vzťah so svojimi opatrovateľmi, ' +
        'a teraz hľadá milujúci domov, kde bude môcť ukázať svoju vernosť a hravú povahu. ' +
        'Je to veselý a priateľský pes, ktorý si obľúbi každého, kto mu venuje čas a pozornosť.'
    },
    { id: 10,type: 'dog', info: 'preferuje tichšie miesta', name: 'Ricky', size: 'veľká', sex: 'pes', photo: 'images/dogs/dog10.jpg', age: '6 rokov', shelterDuration: '1 rok',
    description: 'Ricky je veľký a silný pes, ktorý v sebe skrýva množstvo skúseností.' +
        ' Má 6 rokov a predtým slúžil ako policajný pes, čo znamená, že je nielen inteligentný, ale aj veľmi disciplinovaný. ' +
        'Po roku strávenom v útulku teraz hľadá nový domov, kde bude môcť využiť svoju oddanosť a lojalitu. ' +
        'Ricky je ideálnym spoločníkom pre aktívnych majiteľov, ktorí si cenia jeho silný charakter a vernosť. T' +
        'ento pes si zaslúži milujúci domov, ktorý mu poskytne bezpečie.'
    },
    { id: 11, type: 'dog', info: 'žiadne', name: 'Edina', size: 'malá', sex: 'fenka', photo: 'images/dogs/dog11.jpg', age: '2 roky', shelterDuration: '1,5 roka',
    description: 'Edina je malá, ale veľmi silná fenka, ktorá má za sebou náročnú minulosť. ' +
        'Má 2 roky a pol roka strávila na ulici, kde sa naučila bojovať o prežitie.' +
        ' Napriek týmto ťažkým skúsenostiam je Edina veľmi priateľská, láskavá a túži po láske a bezpečí svojho nového domova. ' +
        'Je to pes, ktorý vie, čo znamená vytrvalosť a dôvera, a je pripravený podeliť sa o svoju oddanosť so svojimi novými majiteľmi. ' +
        'Edina si zaslúži milujúci domov, kde bude môcť začať nový, šťastný život.'
    },
    { id: 12,type: 'dog', info: 'žiadne', name: 'Henry', size: 'stredná', sex: 'pes', photo: 'images/dogs/dog12.jpg', age: '3 roky', shelterDuration: '3 roky',
    description: 'Henry je 3-ročný pes strednej veľkosti, ktorý strávil celý svoj život v útulku. ' +
        'Napriek tomu, že ešte nezažil život mimo jeho stien, je to veľmi priateľský a láskavý pes, ktorý túži po láske a pozornosti. ' +
        'Henry má veľké srdce a je pripravený podeliť sa o svoju vernosť a oddanosť s novým majiteľom. ' +
        'Tento pes je ideálny pre tých, ktorí hľadajú psa s jemnou povahou a sú pripravení dať mu šancu na nový život plný šťastia a bezpečia.'
    },
    { id: 13, type: 'dog', info: 'žiadne', name: 'Hektor', size: 'stredná', sex: 'pes', photo: 'images/dogs/dog13.jpg', age: '2 roky' , shelterDuration: '2 roky',
    description: 'Hektor je 2-ročný pes strednej veľkosti, ktorý je plný energie a radosti. ' +
        'Tento hravý a veselý pes si vždy nájde spôsob, ako vás rozosmiať svojimi neustálymi vtipmi a aktivitami. ' +
        'Hektor je ideálny pre aktívnych majiteľov, ktorí hľadajú psa s množstvom energie na každodenné dobrodružstvá. ' +
        'Je priateľský, sociálny a vždy pripravený na hranie či prechádzky. ' +
        'Tento mladý pes sa teší na nový domov, kde bude mať veľa príležitostí na zábavu a lásku.'
    },
    { id: 14, type: 'dog', info: 'bojí sa áut', name: 'Lily', size: 'malá', sex: 'fenka', photo: 'images/dogs/dog14.jpg', age: '1 rok' , shelterDuration: '1 rok',
    description: 'Lily je malá, 1-ročná fenka, ktorá zaujme svojou pokojnou a vyrovnanou povahou. ' +
        'Napriek svojej malej veľkosti je veľmi rozvážna a tichá, čo ju robí ideálnym spoločníkom pre tých, ktorí hľadajú pokojného ' +
        'a prítulného psa. Lily je skvelá na relaxačné chvíle, ale aj na prechádzky, ktoré si užíva vo svojom vlastnom tempe. ' +
        'Je to fenka, ktorá miluje spoločnosť a lásku, a bude skvelým členom rodiny, ktorý prinesie do domácnosti harmóniu a pohodu.'
    },
    { id: 15, type: 'dog', info: 'žiadne', name: 'Heidy', size: 'veľká', sex: 'fenka', photo: 'images/dogs/dog15.jpg', age: '6 rokov', shelterDuration: '2 roky',
        description: 'Heidy je 6-ročná veľká fenka, ktorá má za sebou výnimočnú minulosť. ' +
            'Predtým bola psíkom pre nevidiacich, čo znamená, že je nielen veľmi inteligentná, ale aj mimoriadne verná a spoľahlivá. ' +
            'Má silný charakter a je zvyknutá pracovať a plniť úlohy, no napriek tomu je tiež veľmi láskavá a milujúca.' +
            ' Heidy je ideálna pre tých, ktorí hľadajú psa s vycibrenými schopnosťami, ktorý je zároveň pokojný a starostlivý. ' +
            'Tento obdivuhodný pes si zaslúži domov, kde bude milovaný a kde sa bude cítiť šťastne a v bezpečí.'
    },
    { id: 16, type: 'dog', info: 'žiadne', name: 'Romeo', size: 'stredná', sex: 'pes', photo: 'images/dogs/dog16.jpg', age: '3 roky', shelterDuration: '3 roky',
    description: 'Romeo je nádherný 3-ročný psík, ktorý svojím vzhľadom doslova očarí každého, kto ho vidí. ' +
        'Tento elegantný pes sa môže pochváliť množstvom výhier v súťažiach o krásu, kde získal niekoľko cien za svoj dokonalý vzhľad. ' +
        'Romeo je nielen krásny, ale aj priateľský a milý, čo ho robí ideálnym spoločníkom pre každého, kto si hľadá psa s charizmou a vynikajúcim charakterom. ' +
        'Je to pes, ktorý sa nielen páči na pohľad, ale aj svojim správaním si získa srdcia všetkých okolo seba.'
    },
    { id: 17, type: 'dog', info: 'nemôže často bývať sama', name: 'Luna', size: 'veľká', sex: 'fenka', photo: 'images/dogs/dog17.jpg', age: '4 roky', shelterDuration: '3 roky',
    description: 'Luna je 4-ročná veľká fenka, ktorá si prešla náročnou skúškou života.' +
        ' Po roku strávenom u majiteľa, ktorý jej poskytoval len veľmi málo potravy, sa Luna teraz nachádza v útulku,' +
        ' kde si začína užívať lepší život. Napriek svojej minulosti je Luna veľmi láskavá, trpezlivá a vďačná za každú maličkosť. ' +
        'Je to silná fenka s obrovským srdcom, ktorá si zaslúži domov, kde bude obklopená láskou, starostlivosťou a dostatkom potravy. ' +
        'Luna je ideálna pre tých, ktorí hľadajú verného a oddaného spoločníka, ktorý si vie ceniť aj tie najmenšie prejavy lásky.'
    },
    { id: 18, type: 'dog', info: 'žiadne', name: 'Jeffrey', size: 'malá', sex: 'pes', photo: 'images/dogs/dog18.jpg', age: '2 roky', shelterDuration: '2 roky',
    description: 'Jeffrey je 2-ročný malý pes, ktorý si získa každého svojou neodolateľnou roztomilosťou. ' +
        'Tento veľmi zlatý psík má veľké srdce a je plný energie a radosti. Svojou prítulnosťou a veselou povahou vie, ' +
        'ako rozveseliť každého, kto ho obklopí. Jeffrey je ideálny pre tých, ktorí hľadajú malého, no veľmi milého a hravého psa, ' +
        'ktorý bude verný spoločník na každý deň.'
    },
    { id: 19, type: 'dog', info: 'žiadne', name: 'Nox', size: 'malá', sex: 'pes', photo: 'images/dogs/dog19.jpg', age: '1 rok', shelterDuration: '1 rok',
    description: 'Nox je 1-ročný malý pes s krásnymi čierno-hnedými škvrnami, ktoré mu dávajú jedinečný vzhľad. ' +
        'Tento mladý psík je plný energie a zvedavosti, vždy pripravený na nové dobrodružstvá. ' +
        'Nox je priateľský, hravý a veľmi spoločenský, takže sa rýchlo stane obľúbeným členom každej rodiny. ' +
        'Je ideálny pre tých, ktorí hľadajú malého, ale veľmi živého a láskyplného spoločníka.'
    },
    { id: 20, type: 'dog', info: 'preferuje pomalšie vychádzky', name: 'Egon', size: 'veľká', sex: 'pes', photo: 'images/dogs/dog20.jpg', age: '6 rokov', shelterDuration: 'pol roka',
    description: 'Egon je 6-ročný veľký pes, ktorý pred pol rokom našiel útočisko v útulku. ' +
        'Predtým bol spoľahlivým spoločníkom jedného kriminalistu, čo znamená, že je nielen veľmi inteligentný, ale aj disciplinovaný a lojálny. ' +
        'Egon má silný charakter a je ideálny pre tých, ktorí hľadajú odvážneho, no zároveň jemného a spoľahlivého spoločníka. ' +
        'Hľadá nový domov, kde bude môcť využiť svoje schopnosti a ponúknuť vernosť svojmu novému majiteľovi. '
    },
    { id: 21, type: 'dog', info: 'žiadne', name: 'Fred', size: 'veľká', sex: 'pes', photo: 'images/dogs/dog21.jpg', age: '8 rokov', shelterDuration: '8 rokov',
    description: 'Fred je 8-ročný veľký pes, ktorý je pravým príkladom toho, čo znamená byť priateľský a láskavý. ' +
        'Napriek svojej veľkosti je veľmi jemný a milý, vždy pripravený na maznanie a spoločnosť. F' +
        'red si získal srdcia všetkých, ktorí sa s ním stretli, svojou pokojnou a prívetivou povahou. ' +
        'Tento pes je ideálny pre tých, ktorí hľadajú verného spoločníka, ktorý je ochotný venovať sa svojmu majiteľovi a vytvoriť si silné puto.'
    },
    { id: 22,type: 'dog', info: 'žiadne', name: 'Jamie', size: 'malá', sex: 'fenka', photo: 'images/dogs/dog22.jpg', age: '3 roky' , shelterDuration: '2 roky',
    description: 'Jamie je 3-ročná malá fenka, ktorá očarí svojou roztomilosťou a priateľskou povahou. ' +
        'Tento malý psík je plný energie, hravosti a vždy pripravený na dobrodružstvo. ' +
        'Jamie je ideálna pre tých, ktorí hľadajú spoločníka, ktorý sa rád mazná a je veľmi spoločenský. ' +
        'Napriek svojej malej veľkosti má veľké srdce a vždy prinesie do domácnosti radosť a smiech. ' +
        'Jamie si zaslúži domov, kde bude obklopená láskou a kde sa bude môcť naplno venovať svojim hrám a maznaniu.'
    },
    { id: 23, type: 'dog', info: 'žiadne', name: 'Noeli', size: 'malá', sex: 'fenka', photo: 'images/dogs/dog23.jpg', age: '1 rok', shelterDuration: '1 rok',
    description: 'Noeli je 1-ročná malá fenka, ktorá je skutočne ňuňu! ' +
        'Je to roztomilá a nežná psíčka, ktorá miluje byť v spoločnosti ľudí. ' +
        'So svojou malou veľkosťou je ideálna na mazlenie a vždy sa rada pritúli k svojim majiteľom.' +
        ' Noeli je plná energie a hravosti, no zároveň je aj veľmi prítulná a túži po láske a pozornosti. ' +
        'Tento sladký psík je perfektným spoločníkom pre tých, ktorí hľadajú malého, ale veľmi milého a priateľského psa.'
    },
    { id: 24, type: 'dog', info: 'žiadne', name: 'Maxim', size: 'stredná', sex: 'pes', photo: 'images/dogs/dog24.jpg', age: '4 roky' , shelterDuration: '2 roky',
    description: 'Maxim je 4-ročný stredne veľký pes, ktorý je krásnym zástupcom plemena labrador. ' +
        'Tento priateľský a verný pes je známy svojou vyrovnanou povahou a láskou k ľuďom. ' +
        'Maxim je ideálny spoločník pre aktívne rodiny, ktoré si užívajú spoločné prechádzky, hry a dobrodružstvá.' +
        ' Je to pes, ktorý je vždy ochotný venovať sa svojim majiteľom, maznanie a pozornosť sú pre neho najväčšou radosťou. ' +
        'Maxim je skvelý priateľ, ktorý si zaslúži domov plný lásky a starostlivosti.'
    },
];

const cats = [
    { id: 1, type: 'cat', name: 'Chelsy', size: 'stredná', sex: 'mačka', photo: 'images/cats/cat1.jpg', age: '3 roky', shelterDuration: '2 roky',
    description: 'Chelsy je 3-ročná stredne veľká mačka, ktorá okamžite zaujme svojím elegantným čiernym kožúškom a očarujúcimi, výraznými očami. ' +
        'Tento nádherný vzhľad dopĺňa jej priateľská a láskavá povaha. C' +
        'helsy je mačka, ktorá si užíva spoločnosť svojich ľudí, ale zároveň si rada vychutnáva chvíle samoty. ' +
        'Je to tichá a pokojná spoločníčka, ktorá vie, ako spríjemniť každý deň svojou nežnosťou a prítulnosťou. ' +
        'Chelsy si zaslúži domov, kde bude obklopená láskou a starostlivosťou, ktorú si určite získa svojimi krásnymi očami a šarmom.'
    },
    { id: 2, type: 'cat', name: 'Barbie', size: 'stredná', sex: 'mačka', photo: 'images/cats/cat2.jpg', age: '2 roky', shelterDuration: '2 roky',
    description: 'Barbie je 2-ročná stredne veľká mačka, ktorá zaujme svojou nádhernou hnedou srsťou. ' +
        'Je to mačka, ktorá si každý pohľad zaslúži, a jej elegantný vzhľad je doplnený o veľmi priateľskú a milú povahu. ' +
        'Barbie je hravá a energická, ale zároveň veľmi prítulná, rada trávi čas so svojimi ľuďmi a vychutnáva si ich pozornosť. ' +
        'Je to ideálna mačka pre tých, ktorí hľadajú krásneho a zároveň láskavého spoločníka. '
    },
    { id: 3, type: 'cat', name: 'Timothe', size: 'stredná', sex: 'kocúr', photo: 'images/cats/cat3.jpg', age: '4 roky', shelterDuration: '1 rok',
    description: 'Timothe je 4-ročný stredne veľký kocúr, ktorý je plný šarmu a elegancie.' +
        ' Tento mačací gentleman má v sebe skvelú kombináciu nezávislosti a láskavosti. ' +
        'Timothe je priateľský, ale zároveň si rád užíva chvíle samoty, keď si odpočíva v tichu svojho obľúbeného miesta.' +
        ' Je to kocúr, ktorý si vždy nájde čas na lásku a maznanie, no tiež má svoj vlastný temperament a charizmu.'
    },
    { id: 4, type: 'cat', name: 'Zara', size: 'malá', sex: 'mačka', photo: 'images/cats/cat4.jpg', age: '1 rok', shelterDuration: '1 rok',
    description: 'Zara je 1-ročná malá mačka, ktorá sa vyznačuje svojou nádhernou bielou srsťou a očarujúcimi modrými očami. ' +
        'Tento vzhľad ju robí jedinečnou a nezameniteľnou. Zara je priateľská a zvedavá, rada preskúmava svoj svet, ale zároveň si užíva aj chvíle, keď sa môže pochúliť na kolenách svojho majiteľa. ' +
        'Je to mačka s jemnou povahou, ktorá si získa srdce každého, kto jej venuje pozornosť. Zara si zaslúži domov, kde bude obklopená láskou a starostlivosťou, ' +
        'ktorú si určite získa svojimi krásnymi očami a roztomilým správaním.'
    },
    { id: 5, type: 'cat', name: 'Rafi', size: 'stredná', sex: 'kocúr', photo: 'images/cats/cat5.jpg', age: '3 roky', shelterDuration: '3 roky',
    description: 'Rafi je 3-ročný stredne veľký kocúr s nádherným vzorom na srsti, ktorý ho robí skutočne jedinečným. ' +
        'Jeho elegantné sfarbenie a krásny kožúšok sú doplnené o priateľskú a hravú povahu. ' +
        'Rafi je kocúr, ktorý si rád užíva spoločnosť svojich ľudí, ale nezabúda ani na chvíle odpočinku. ' +
        'Je plný energie, zvedavosti a občas si užíva aj chvíle samoty. ' +
        'Rafi je ideálny spoločník pre tých, ktorí hľadajú mačku s krásnym vzhľadom a zároveň príjemnou a láskavou povahou.'
    },
    { id: 6, type: 'cat', name: 'Lucky', size: 'malá', sex: 'kocúr', photo: 'images/cats/cat6.jpg', age: '1 rok', shelterDuration: '1 rok',
    description: 'Lucky je 1-ročný malý kocúr s nádhernou hustou srsťou, ktorá mu dodáva na elegancii a šarme. ' +
        'Tento roztomilý kocúr je plný energie, zvedavosti a vždy pripravený na nové dobrodružstvá. ' +
        'Rád preskúmava okolie, no zároveň si užíva aj chvíle oddychu, keď sa schúli do svojho obľúbeného miesta. ' +
        'Lucky je veľmi priateľský a spoločenský, vždy pripravený na maznanie a zdieľanie lásky.'
    },
    { id: 7, type: 'cat', name: 'Jessica', size: 'stredná', sex: 'mačka', photo: 'images/cats/cat7.jpg', age: '4 roky' , shelterDuration: '3 roky',
        description: 'Jessica je 4-ročná stredne veľká mačka s očarujúcimi, veľkými a výraznými očami, ktoré jej dodávajú fascinujúci vzhľad.' +
            ' Tento nádherný vzhľad dopĺňa jej priateľská a láskavá povaha.' +
            ' Jessica je mačka, ktorá si užíva spoločnosť svojich ľudí, ale tiež vie, ako si užiť chvíle samoty. ' +
            'Je to veľmi nezávislá, no zároveň veľmi prítulná mačka, ktorá miluje byť v centre pozornosti.'
    },
    { id: 8, type: 'cat', name: 'Tito', size: 'stredná', sex: 'kocúr', photo: 'images/cats/cat8.jpg', age: '5 rokov', shelterDuration: '3 roky',
    description: 'Tito je 5-ročný stredne veľký kocúr, ktorý si získa srdce každého svojou priateľskou a pokojnou povahou.' +
        ' Tento charizmatický kocúr je plný šarmu a vďaka svojej vyrovnanej povahe je ideálnym spoločníkom do každého domova. ' +
        'Tito si rád užíva chvíle oddychu a relaxácie, no zároveň je pripravený na chvíle zábavy a hry. ' +
        'Je to mačací gentleman, ktorý si zaslúži domov plný lásky a starostlivosti, kde bude šťastný a spokojný. ' +
        'Tito je dokonalý kocúr pre tých, ktorí hľadajú mačku s vyváženou povahou a veľkým srdcom.'
    },
];

const users = [
    { idNumber: "123456", name: "Peter", surname: "Novák", phone: "0901234567", email: "peter.novak@email.com", password: "password123" },
    { idNumber: "654321", name: "Eva", surname: "Kováčová", phone: "0912345678", email: "eva.kovacova@email.com", password: "password321" },
    { idNumber: "112233", name: "Marek", surname: "Horváth", phone: "0923456789", email: "marek.horvath@email.com", password: "password456" },
    { idNumber: "223344", name: "Jana", surname: "Müllerová", phone: "0934567890", email: "jana.mullerova@email.com", password: "password789" },
    { idNumber: "334455", name: "Tomáš", surname: "Varga", phone: "0945678901", email: "tomas.varga@email.com", password: "password101" }
];