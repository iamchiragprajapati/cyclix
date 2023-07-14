export interface bikeType {
  typeId: number | undefined;
  type: string | undefined;
}

export interface bikeBrand {
  brandId: number | undefined;
  brand: string | undefined;
}

export interface addVehicleInfo {
  bikeTypes: string | undefined;
  bikeBrands: string | undefined;
}
