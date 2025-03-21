package vn.shoestore.usecases.logic.product;

import vn.shoestore.application.request.CategoryRequest;
import vn.shoestore.domain.model.Category;

import java.util.List;

public interface ICategoryUseCase {
  Category createCategory(CategoryRequest request);

  Category updateCategory(CategoryRequest request);

  void deleteCategory(Long id);

  Category getById(Long id);

    List<Category> getAll();
}
