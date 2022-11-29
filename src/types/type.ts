export interface DataImageList {
  image: String;
  _id: String;
}

export interface DataResponse {
  _id: String;
  tour_id: Number;
  name: String;
  description: String;
  price: Number;
  image: [DataImageList];
  address: String;
  address_detail: String;
  created_by: Number;
  status: String;
  is_disable: Boolean;
  restaurant_id: Number;
  hotel_id: Number;
  idTour: Number;
  __v: Number;
}