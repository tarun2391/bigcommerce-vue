module.exports.productBySlug = (params) => {
  return `query LookUpUrl {
    site {
      route(path: "/${params.slug}/") {
        node {
          __typename
          ... on Product {
            id
            entityId
            productOptions {
              edges {
                node {
                  entityId
                  displayName
                  isRequired
                }
              }
            }
            variants {
              edges {
                node {
                  id
                  entityId
                  options {
                    edges {
                      node {
                        displayName
                        values {
                          edges {
                            node {
                              entityId
                              label
                            }
                          }
                        }
                      }
                    }
                  }
                }
              }
            }
            name
            description
            addToCartUrl
            defaultImage {
              url640wide: url(width: 640)
            }
            images {
              edges {
                node {
                  altText
                  mobile: url(width: 400, height: 400)
                  desktop: url(width: 600, height: 600)
                  big: url(width: 1200, height: 1200)
                }
              }
            }
            brand {
              name
              seo {
                pageTitle
                metaDescription
                metaKeywords
              }
            }
            path
            prices {
              price {
                value
                currencyCode
              }
              salePrice {
                value
                currencyCode
              }
            }
            reviewSummary {
              numberOfReviews
              summationOfRatings
            }
            options {
              edges {
                node {
                  entityId
                  isRequired
                  displayName
                  values {
                    edges {
                      node {
                        entityId
                        label
                      }
                    }
                  }
                }
              }
            }
            customFields {
              edges {
                node {
                  name
                  value
                }
              }
            }
          }
        }
      }
    }
  }`;
};
