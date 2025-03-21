package vn.shoestore.application.request;

import com.fasterxml.jackson.databind.PropertyNamingStrategies;
import com.fasterxml.jackson.databind.annotation.JsonNaming;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import vn.shoestore.domain.model.Category;
import vn.shoestore.domain.model.ProductAttachment;

import java.util.ArrayList;
import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor
@JsonNaming(PropertyNamingStrategies.SnakeCaseStrategy.class)
@Builder
public class ProductRequest {
  private Long id;
  private String name;
  private String code;
  private String description;
  private Long price;
  private Long brandId;
  private String color;

  @Builder.Default private List<Long> categories = new ArrayList<>();
  @Builder.Default private List<String> images = new ArrayList<>();
  @Builder.Default private List<Integer> sizes = new ArrayList<>();
}
