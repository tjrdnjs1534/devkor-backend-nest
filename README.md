|METHOD|URI|Params|Body|Description|
|:------:|---|:---:|----|-----|
|GET|:/users|||전체 사용자 조회|
|GET|:/users/{id}|id||사용자 ID를 통한 조회|
|PUT|:/users/{id}|id|id,name,age|사용자 ID를 통한 업데이트|
|DELETE|:/users/{id}|id||특정 ID 사용자 회원탈퇴|
|POST|:/users||id,name,age|회원 생성|
