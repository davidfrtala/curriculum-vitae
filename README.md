# GraphQL Personal Curriculum Vitae

This is my personal CV sheet, designed as GraphQL backend server. 

Preview of this repository is available [here](http://cv.scalabs.it)

## Install

```sh
yarn install
npm start
```

then you should see in output, that server is running on `http://localhost:4000`

## Full preview

If you don't want to play with the schema, you can paste this query in left window of GraphiQL and get the full record

```sh
{
  viewer {
    fullname
    title
    address
    region
    phone
    started_in
    years_of_practice
    email
    skype
    links
    hobbies
    experience {
      work {
        totalCount
        edges {
          node {
            ...work
          }
        }
      }
      volunteer {
        edges {
          node {
            ...work
          }
        }
      }
      projects {
        edges {
          node {
            ...project
          }
        }
      }
    }
    skills {
      languages {
        ...skill
      }
      technologies {
        edges {
          node {
            ...skill
          }
        }
      }
    }
    education {
      edges {
        node {
          school
          faculty
          field
          degree
          grade
          start
          end
        }
      }
    }
  }
}

fragment work on Work {
  company
  position
  start
  end
  length
  description
  technologies {
    name
  }
}

fragment project on Project {
  name
  link
  status
  description
  technologies {
    name
  }
}

fragment skill on Skill {
  name
  level
  description
}
```
