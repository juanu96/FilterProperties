import { gql } from '@apollo/client'

export const LISTING = gql`
query GET_LISTINGS($first: Int, $last: Int, $after: String, $before: String, $WHERE: RootQueryToListingConnectionWhereArgs) {
  listings (
    first: $first
    last: $last
    after: $after
    before: $before
    where: $WHERE 
  ){
    pageInfo {
      hasNextPage
      hasPreviousPage
      startCursor
      endCursor
      offsetPagination {
        hasMore
        hasPrevious
        total
      }
    }
    nodes {
      link
      rooms {
        nodes {
          name
        }
      }
      locations {
        nodes {
          name
        }
      }
      budgets {
        nodes {
          name
        }
      }
      statusListings {
        nodes {
          name
        }
      } 
      listing {
        overview {
          bedrooms {
            icon {
              mediaItemUrl
            }
            content
          }
          bathrooms {
            icon {
              mediaItemUrl
            }
            content
          }
          propertyId {
            content
          }
          constructionArea {
            icon {
              mediaItemUrl
            }
            content
          }
        }
          price
      }
      featuredImage {
        node {
          mediaItemUrl
        }
      }
    }
  }
}`


export const LISTINGWHITOUTWHERE = gql`
query GET_LISTINGS($first: Int, $last: Int, $after: String, $before: String, $offset: Int, $size: Int) {
  listings (
    first: $first
    last: $last
    after: $after
    before: $before
    where: { offsetPagination: {offset: $offset, size: $size} }
  ){
    pageInfo {
      hasNextPage
      hasPreviousPage
      startCursor
      endCursor
      offsetPagination {
        hasMore
        hasPrevious
        total
      }
    }
    nodes {
      link
      rooms {
        nodes {
          name
        }
      }
      locations {
        nodes {
          name
        }
      }
      budgets {
        nodes {
          name
        }
      }
      statusListings {
        nodes {
          name
        }
      } 
      listing {
        overview {
          bedrooms {
            icon {
              mediaItemUrl
            }
            content
          }
          bathrooms {
            icon {
              mediaItemUrl
            }
            content
          }
          propertyId {
            content
          }
          constructionArea {
            icon {
              mediaItemUrl
            }
            content
          }
        }
        price
      }
      featuredImage {
        node {
          mediaItemUrl
        }
      }
    }
  }
}`
