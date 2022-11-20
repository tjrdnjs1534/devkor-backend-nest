
## API 설계 
|METHOD|URI|Params|Body|Description|
|:------:|---|:---:|----|-----|
|GET|:/home|||메인 페이지|
|POST|:/register||userID, Password|메인 페이지|
|POST|:/login||userID, Password|메인 페이지|
|POST|:/logout|||메인 페이지|
|GET|:/users|||전체 사용자 조회|
|GET|:/users/{id}|id||사용자 ID를 통한 조회|
|POST|:/users||id,name,age,role|회원 생성|
|PUT|:/users/{id}|id|age,role|사용자 ID를 통한 업데이트|
|DELETE|:/users/{id}|id||특정 ID 사용자 회원탈퇴|
|GET|:/products|||전체 상품 조회|
|GET|:/products/{id}|id||상품 ID를 통한 조회|
|POST|:/products||id,name,price,|상품 등록|
|PUT|:/products/{id}|id|age,role|상품 ID를 통한 업데이트|
|DELETE|:/products/{id}|id||특정 ID 상품 삭제|
