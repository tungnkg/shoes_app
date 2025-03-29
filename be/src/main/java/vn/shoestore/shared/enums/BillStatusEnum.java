package vn.shoestore.shared.enums;

import lombok.Getter;

@Getter
public enum BillStatusEnum {
  CREATED(0),
  CONFIRM(1),
  DELIVERY(2),
  PURCHASE(3),
  CANCEL(4);

  private final int status;

  BillStatusEnum(int status) {
    this.status = status;
  }
}
