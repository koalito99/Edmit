# Getting a local cache of TakeShape colleges

```
curl -X POST \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer 19622db1ff2b43caa825dcb0321f9d40" \
  https://api.takeshape.io/project/d11acc5f-bddf-4b29-8839-9cc0b5e3f958/graphql \
  -d '{"query": "\nquery CollegeQuery {\n    getCollegeList(size: 1000) {\n      items {\n          _id\n        name\n        collegeOwnership {\n          _id\n        }\n        collegeSize {\n          _id\n        }\n        collegeRegion {\n          _id\n        }\n        majorsOffered {\n          _id\n        }\n        satScorePoints {\n          percentile\n          score\n        }\n        actScorePoints {\n          percentile\n          score\n        }\n        earningsPoints {\n            yearAfterGraduation\n          amount\n        }\n        slug\n        postalCode{\n          city {\n            _id\n              name\n            state {\n              _id\n              name\n            }\n          }\n          metroAreaSet {\n              items {\n              _id\n            }\n          }\n        }\n      }\n    }\n  }"}' \
  | jq -c -r '.data.getCollegeList.items[]' | while read line; do echo $line > /Users/cjelly/dev/edmit/frontend/learn/src/data/colleges/$(echo $line | jq -r ._id).json; done

curl -X POST \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer 19622db1ff2b43caa825dcb0321f9d40" \
  https://api.takeshape.io/project/d11acc5f-bddf-4b29-8839-9cc0b5e3f958/graphql \
  -d '{"query": "\nquery CollegeQuery {\n    getCollegeList(from: 1000, size: 1000) {\n      items {\n          _id\n        name\n        collegeOwnership {\n          _id\n        }\n        collegeSize {\n          _id\n        }\n        collegeRegion {\n          _id\n        }\n        majorsOffered {\n          _id\n        }\n        satScorePoints {\n          percentile\n          score\n        }\n        actScorePoints {\n          percentile\n          score\n        }\n        earningsPoints {\n            yearAfterGraduation\n          amount\n        }\n        slug\n        postalCode{\n          city {\n            _id\n              name\n            state {\n              _id\n              name\n            }\n          }\n          metroAreaSet {\n              items {\n              _id\n            }\n          }\n        }\n      }\n    }\n  }"}' \
  | jq -c -r '.data.getCollegeList.items[]' | while read line; do echo $line > /Users/cjelly/dev/edmit/frontend/learn/src/data/colleges/$(echo $line | jq -r ._id).json; done

curl -X POST \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer 19622db1ff2b43caa825dcb0321f9d40" \
  https://api.takeshape.io/project/d11acc5f-bddf-4b29-8839-9cc0b5e3f958/graphql \
  -d '{"query": "\nquery CollegeQuery {\n    getCollegeList(from: 2000, size: 1000) {\n      items {\n          _id\n        name\n        collegeOwnership {\n          _id\n        }\n        collegeSize {\n          _id\n        }\n        collegeRegion {\n          _id\n        }\n        majorsOffered {\n          _id\n        }\n        satScorePoints {\n          percentile\n          score\n        }\n        actScorePoints {\n          percentile\n          score\n        }\n        earningsPoints {\n            yearAfterGraduation\n          amount\n        }\n        slug\n        postalCode{\n          city {\n            _id\n              name\n            state {\n              _id\n              name\n            }\n          }\n          metroAreaSet {\n              items {\n              _id\n            }\n          }\n        }\n      }\n    }\n  }"}' \
  | jq -c -r '.data.getCollegeList.items[]' | while read line; do echo $line > /Users/cjelly/dev/edmit/frontend/learn/src/data/colleges/$(echo $line | jq -r ._id).json; done
```
