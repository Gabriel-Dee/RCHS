import { regions } from "./regions";

// Convert regions array to a union type of region names
type Region = (typeof regions)[number];

export const districts: Record<Region, string[]> = {
  Arusha: ["Arusha City", "Arumeru", "Karatu", "Longido", "Monduli", "Ngorongoro"],
  "Dar es Salaam": ["Ilala", "Kinondoni", "Temeke", "Ubungo", "Kigamboni"],
  Dodoma: ["Bahi", "Chamwino", "Chemba", "Dodoma Urban", "Kondoa", "Mpwapwa"],
  Geita: ["Bukombe", "Chato", "Geita", "Mbogwe", "Nyang'hwale"],
  Iringa: ["Iringa Rural", "Iringa Urban", "Kilolo", "Mufindi"],
  Kagera: ["Biharamulo", "Bukoba Rural", "Bukoba Urban", "Karagwe", "Kyerwa", "Missenyi", "Muleba", "Ngara"],
  Katavi: ["Mlele", "Mpanda Town", "Mpanda Rural"],
  Kigoma: ["Buhigwe", "Kakonko", "Kasulu Rural", "Kasulu Urban", "Kibondo", "Kigoma Rural", "Kigoma Urban", "Uvinza"],
  Kilimanjaro: ["Hai", "Moshi Rural", "Moshi Urban", "Mwanga", "Rombo", "Same", "Siha"],
  Lindi: ["Kilwa", "Lindi Rural", "Lindi Urban", "Liwale", "Nachingwea", "Ruangwa"],
  Manyara: ["Babati Rural", "Babati Urban", "Hanang'", "Kiteto", "Mbulu", "Simanjiro"],
  Mara: ["Bunda", "Butiama", "Musoma Rural", "Musoma Urban", "Rorya", "Serengeti", "Tarime"],
  Mbeya: ["Busokelo", "Chunya", "Kyela", "Mbarali", "Mbeya City", "Rungwe"],
  Morogoro: ["Gairo", "Kilombero", "Kilosa", "Morogoro Rural", "Morogoro Urban", "Mvomero", "Ulanga"],
  Mtwara: ["Masasi", "Mtwara Rural", "Mtwara Urban", "Nanyumbu", "Newala", "Tandahimba"],
  Mwanza: ["Ilemela", "Kwimba", "Magu", "Misungwi", "Nyamagana", "Sengerema", "Ukerewe"],
  Njombe: ["Ludewa", "Makambako", "Makete", "Njombe Rural", "Njombe Urban", "Wanging'ombe"],
  "Pemba North": ["Micheweni", "Wete"],
  "Pemba South": ["Chake Chake", "Mkoani"],
  Pwani: ["Bagamoyo", "Kibaha", "Kisarawe", "Mafia", "Mkuranga", "Rufiji"],
  Rukwa: ["Kalambo", "Nkasi", "Sumbawanga Rural", "Sumbawanga Urban"],
  Ruvuma: ["Mbinga", "Namtumbo", "Nyasa", "Songea Rural", "Songea Urban", "Tunduru"],
  Shinyanga: ["Kahama Rural", "Kahama Urban", "Kishapu", "Shinyanga Rural", "Shinyanga Urban"],
  Simiyu: ["Bariadi", "Busega", "Itilima", "Maswa", "Meatu"],
  Singida: ["Ikungi", "Iramba", "Manyoni", "Mkalama", "Singida Rural", "Singida Urban"],
  Tabora: ["Igunga", "Kaliua", "Nzega", "Sikonge", "Tabora Urban", "Urambo"],
  Tanga: ["Handeni", "Handeni Town", "Kilindi", "Korogwe Rural", "Korogwe Town", "Lushoto", "Mkinga", "Muheza", "Pangani", "Tanga City"],
  "Zanzibar North": ["Kaskazini A", "Kaskazini B"],
  "Zanzibar South": ["Kusini", "Kati"],
  "Zanzibar West": ["Magharibi A", "Magharibi B", "Mjini"],
};
