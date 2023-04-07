export type Images = {
    path: string;
    extension: string;
  };
  
  export type Comic = {
    comic: any;
    id: number;
    digitalId: number;
    title: string;
    issueNumber: number;
    variantDescription: string;
    description: string;
    modified: string;
    isbn: string;
    upc: string;
    diamondCode: string;
    ean: string;
    issn: string;
    format: string;
    pageCount: number;
    textObjects: [];
    resourceURI: string;
    urls: [];
    series: {};
    variants: [];
    collections: [];
    collectedIssues: [];
    dates: [];
    thumbnail: {
      path: string;
      extension: string;
    };
    images: Images[];
    creators: {
      available: number;
      collectionURI: string;
      items: [];
      returned: number;
    };
    characters: {
      available: number;
      collectionURI: string;
      items: [];
      returned: number;
    };
    stories: {
      available: number;
      collectionURI: string;
      items: [];
      returned: number;
    };
    events: {
      available: number;
      collectionURI: string;
      items: [];
      returned: number;
    };
    price: number;
    oldPrice: number;
    stock: number;
  };
  