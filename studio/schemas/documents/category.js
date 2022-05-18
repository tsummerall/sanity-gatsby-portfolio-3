import { orderRankField, orderRankOrdering } from "@sanity/orderable-document-list";

export default {
  name: "category",
  type: "document",
  title: "Category",
  orderings: [orderRankOrdering],
  fields: [
    orderRankField({ type: "category" }),
    {
      name: "title",
      type: "string",
      title: "Title"
    },
    {
      name: "buttonImage",
      type: "figure",
      title: "Button Image"
    },
    {
      name: "buttonBackgroundColor",
      type: "color",
      title: "Button Bkgd Color"
    },
    {
      name: "description",
      type: "text",
      title: "Description"
    },
    {
      name: "slug",
      title: "Slug",
      type: "slug",
      options: {
        source: "title",
        maxLength: 96
      }
    },
    {
      name: "order",
      type: "number",
      title: "Order",
      hidden: true
    }
  ]
};
