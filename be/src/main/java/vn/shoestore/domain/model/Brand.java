package vn.shoestore.domain.model;

import com.fasterxml.jackson.databind.PropertyNamingStrategies;
import com.fasterxml.jackson.databind.annotation.JsonNaming;
import jakarta.persistence.Column;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
@JsonNaming(PropertyNamingStrategies.SnakeCaseStrategy.class)
public class Brand {
  private Long id;
  private String name;
  private String phoneNumber;
  private String address;
  private String description;
  private String imagePath;
  private LocalDateTime createdDate;
  private LocalDateTime updatedDate;
}
