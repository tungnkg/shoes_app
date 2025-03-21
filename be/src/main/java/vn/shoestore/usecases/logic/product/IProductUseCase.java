package vn.shoestore.usecases.logic.product;

import org.springframework.http.ResponseEntity;
import vn.shoestore.application.request.ProductRequest;
import vn.shoestore.application.response.BaseResponse;
import vn.shoestore.application.response.ProductResponse;
import vn.shoestore.domain.model.Product;

import java.util.List;

public interface IProductUseCase {
  void createOrUpdateProduct(ProductRequest request);

  void deleteProduct(Long id);

  List<ProductResponse> getAll();
}
