interface AddressComponent {
  long_name: string;
  short_name: string;
  types: Array<string>;
}

interface AddressPieces {
  streetNumber: string;
  streetName: string;
  city: string;
  state: string;
  country: string;
  zip: string;
}

export interface Address {
  address: string;
  city: string;
  state: string;
  country: string;
  zip: string;
}

export default class GoogleAddressParser {
  private addressPieces: AddressPieces = {
    streetNumber: '',
    streetName: '',
    city: '',
    state: '',
    country: '',
    zip: '',
  };

  constructor(private address_components: Array<AddressComponent>) {
    this.parseAddress();
  }

  private parseAddress(): void {
    if (!Array.isArray(this.address_components)) {
      throw Error('Address Components is not an array');
    }

    if (!this.address_components.length) {
      throw Error('Address Components is empty');
    }

    for (let i = 0; i < this.address_components.length; i++) {
      const component: AddressComponent = this.address_components[i];

      if (this.isStreetNumber(component)) {
        this.addressPieces.streetNumber = component.long_name;
      }

      if (this.isStreetName(component)) {
        this.addressPieces.streetName = component.long_name;
      }

      if (this.isCity(component)) {
        this.addressPieces.city = component.long_name;
      }

      if (this.isCountry(component)) {
        this.addressPieces.country = component.long_name;
      }

      if (this.isState(component)) {
        this.addressPieces.state = component.short_name;
      }

      if (this.isZip(component)) {
        this.addressPieces.zip = component.long_name;
      }
    }
  }

  private isStreetNumber(component: AddressComponent): boolean {
    return component.types.includes('street_number');
  }

  private isStreetName(component: AddressComponent): boolean {
    return component.types.includes('route');
  }

  private isCity(component: AddressComponent): boolean {
    return component.types.includes('locality');
  }

  private isState(component: AddressComponent): boolean {
    return component.types.includes('administrative_area_level_1');
  }

  private isCountry(component: AddressComponent): boolean {
    return component.types.includes('country');
  }

  private isZip(component: AddressComponent): boolean {
    return component.types.includes('postal_code');
  }

  result(): Address {
    return {
      ...this.addressPieces,
      address: `${this.addressPieces.streetNumber} ${this.addressPieces.streetName}`,
    };
  }
}
