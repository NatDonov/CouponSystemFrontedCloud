import { CouponModel } from "../Models/CouponModel";
import { CustomerModel } from "../Models/CustomerModel";

export class CustomerAppState {
  public coupons: CouponModel[] = [];
  public customers: CustomerModel[] = [];
  public customerCoupons: CouponModel[] = [];
  public confetiStyle: boolean = false;
}

export enum ActionType {
  GOT_ALL_COUPONS = "GOT_ALL_COUPONS",
  PURCHASE_COUPON = "PURCHASE_COUPON",
  GOT_ALL_CUSTOMERS = "GOT_ALL_CUSTOMERS",
  ADDED_CUSTOMER = "ADDED_CUSTOMER",
  DELETED_CUSTOMER = "DELETED_CUSTOMER",
  UPDATED_CUSTOMER = "UPDATED_CUSTOMER",
  REMOVED_CUSTOMERS = "REMOVED_CUSTOMERS",
  REMOVED_COUPONS = "REMOVED_COUPONS",
  GOT_CUSTOMER_COUPONS = "GOT_CUSTOMER_COUPONS",
  REMOVED_CUSTOMER_COUPONS = "REMOVED_CUSTOMER_COUPONS",
  LOAD_CONFETI = "LOAD_CONFETI",
}

export interface CustomerAction {
  type: ActionType;
  payload?: any;
}

export function loadConfetiAction(confetiStyle: boolean): CustomerAction {
  return {
    type: ActionType.LOAD_CONFETI,
    payload: confetiStyle,
  };
}

export function purchasedCouponAction(couponId: number): CustomerAction {
  return {
    type: ActionType.PURCHASE_COUPON,
    payload: couponId,
  };
}

export function gotAllCouponsAction(coupons: CouponModel[]): CustomerAction {
  return {
    type: ActionType.GOT_ALL_COUPONS,
    payload: coupons,
  };
}

export function gotCustomerCouponsAction(
  coupons: CouponModel[]
): CustomerAction {
  return {
    type: ActionType.GOT_CUSTOMER_COUPONS,
    payload: coupons,
  };
}

export function gotCustomersAction(customers: CustomerModel[]): CustomerAction {
  return {
    type: ActionType.GOT_ALL_CUSTOMERS,
    payload: customers,
  };
}

export function addCustomerAction(customer: CustomerModel): CustomerAction {
  return {
    type: ActionType.ADDED_CUSTOMER,
    payload: customer,
  };
}

export function updateCustomerAction(customer: CustomerModel): CustomerAction {
  return {
    type: ActionType.UPDATED_CUSTOMER,
    payload: customer,
  };
}

export function deleteCustomerAction(customerId: number): CustomerAction {
  return {
    type: ActionType.DELETED_CUSTOMER,
    payload: customerId,
  };
}

export function removedCustomersAction(): CustomerAction {
  return {
    type: ActionType.REMOVED_CUSTOMERS,
    payload: {},
  };
}

export function removedAllCouponsAction(): CustomerAction {
  return {
    type: ActionType.REMOVED_COUPONS,
    payload: {},
  };
}

export function removedCustomerCouponAction(): CustomerAction {
  return {
    type: ActionType.REMOVED_CUSTOMER_COUPONS,
    payload: {},
  };
}

export function customerReducer(
  currentState: CustomerAppState = new CustomerAppState(),
  action: CustomerAction
): CustomerAppState {
  const newState = { ...currentState };
  switch (action.type) {
    case ActionType.GOT_ALL_COUPONS: {
      newState.coupons = action.payload;
      break;
    }
    case ActionType.PURCHASE_COUPON: {
      const coupon = newState.coupons.find(
        (coupon) => coupon.id === action.payload
      );
      coupon && newState.customerCoupons.push(coupon);
      break;
    }

    case ActionType.GOT_ALL_CUSTOMERS: {
      newState.customers = action.payload;
      break;
    }

    case ActionType.GOT_CUSTOMER_COUPONS: {
      newState.customerCoupons = action.payload;
      break;
    }

    case ActionType.ADDED_CUSTOMER: {
      newState.customers.push(action.payload);
      break;
    }

    case ActionType.DELETED_CUSTOMER: {
      newState.customers = newState.customers.filter(
        (customer) => customer.id !== action.payload
      );
      break;
    }

    case ActionType.UPDATED_CUSTOMER: {
      const customerId = newState.customers.findIndex((customer) => {
        return customer.id === action.payload.id;
      });
      newState.customers[customerId] = action.payload;
      break;
    }

    case ActionType.REMOVED_CUSTOMERS: {
      newState.customers = [];
      break;
    }

    case ActionType.REMOVED_COUPONS: {
      newState.coupons = [];
      break;
    }

    case ActionType.REMOVED_CUSTOMER_COUPONS: {
      newState.customerCoupons = [];
      break;
    }
    case ActionType.LOAD_CONFETI: {
      newState.confetiStyle = action.payload;
    }
  }
  return newState;
}
