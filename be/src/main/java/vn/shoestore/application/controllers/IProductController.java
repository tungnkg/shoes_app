package vn.shoestore.application.controllers;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import vn.shoestore.application.request.ProductRequest;
import vn.shoestore.application.response.BaseResponse;
import vn.shoestore.application.response.ProductResponse;
import vn.shoestore.domain.model.Product;

import java.util.List;

@RestController
@RequestMapping("/open-api/v1/product/")
public interface IProductController {

  @PostMapping("/save")
  ResponseEntity<BaseResponse> saveOrUpdateProduct(@RequestBody ProductRequest request);

  @DeleteMapping("{id}")
  ResponseEntity<BaseResponse> deleteProduct(@PathVariable Long id);

  @GetMapping("get-all")
  ResponseEntity<BaseResponse<List<ProductResponse>>> getAll();
}
