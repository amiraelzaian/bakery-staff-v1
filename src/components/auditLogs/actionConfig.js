import { Plus, Pencil, Trash2 } from "lucide-react";

export const ACTION_CONFIG = {
  CREATE_CATEGORY: { label: "Created category", icon: Plus, tone: "create" },
  UPDATE_CATEGORY: { label: "Updated category", icon: Pencil, tone: "update" },
  DELETE_CATEGORY: { label: "Deleted category", icon: Trash2, tone: "delete" },

  CREATE_PRODUCT: { label: "Created product", icon: Plus, tone: "create" },
  UPDATE_PRODUCT: { label: "Updated product", icon: Pencil, tone: "update" },
  DELETE_PRODUCT: { label: "Deleted product", icon: Trash2, tone: "delete" },

  CREATE_USER: { label: "Created user", icon: Plus, tone: "create" },
  UPDATE_USER: { label: "Updated user", icon: Pencil, tone: "update" },
  DELETE_USER: { label: "Deleted user", icon: Trash2, tone: "delete" },

  CREATE_COUPON: { label: "Created coupon", icon: Plus, tone: "create" },
  UPDATE_COUPON: { label: "Updated coupon", icon: Pencil, tone: "update" },
  DELETE_COUPON: { label: "Delete coupon", icon: Trash2, tone: "delete" },

  CREATE_SEASONAL_OFFER: { label: "Created seasonal offer", icon: Plus, tone: "create" },
  UPDATE_SEASONAL_OFFER: { label: "Updated seasonal offer", icon: Pencil, tone: "update" },
  DELETE_SEASONAL_OFFER: { label: "Deleted seasonal offer", icon: Trash2, tone: "delete" },

  DELETE_REVIEW: { label: "Deleted review", icon: Trash2, tone: "delete" },
};

export const TONE_CLASSES = {
  create: "bg-accent/15 text-accent",
  update: "bg-secondary/20 text-secondary-foreground",
  delete: "bg-destructive/15 text-destructive",
};

export const TARGET_TYPE_TABS = [
  { value: "", label: "All" },
  { value: "Product", label: "Products" },
  { value: "Category", label: "Categories" },
  { value: "User", label: "Users" },
  { value: "Coupon", label: "Coupons" },
  { value: "SeasonalOffer", label: "Seasonal Offers" },
  { value: "Review", label: "Reviews" },
];