import "../scss/main.scss";
import "babel-polyfill";
import axios from "axios";

/*
Movie API

영화 리스트
https://yts.mx/api/v2/list_movies.json

영화 상세 정보
https://yts.mx/api/v2/movie_details.json?movie_id=

관련 영화 정보
https://yts.mx/api/v2/movie_suggestions.json?movie_id=
*/

/*
Youtube Link
https://www.youtube.com/watch?v=
*/


// 1 #1
// const fetchMovieList = async () => {
//     let movieList;
//     await axios //await을 붙인 부분만 동기적으로 처리
//         .get("https://yts.mx/api/v2/list_movies.json")
//         .then((response) => {
//             console.log(1);
//             console.log(response.data.data.movies);
//             movieList = response.data.data.movies;
//         })
//         .catch((error) => {
//             console.log(error);
//         });

//     console.log(2);
//     console.log(movieList);
// }

// fetchMovieList();

const fetchMovieList = async () => {

    // const response = await axios.get("https://yts.mx/api/v2/list_movies.json")
    // const movieList = response.data.data.movies;
    // console.log(movieList);
    // -> api 에러가 나올 수 있기 때문에 try문으로 감싸준다.

    try {
        const response = await axios.get("https://yts.mx/api/v2/list_movies.json"); //동기 요청으로, 여기서 기다린다. -> 동기화 처리로 만들어 주는 것이 await이다.
        const movieList = response.data.data.movies;

        console.log(movieList);
    } catch (error) { //then-catch와 다른 점. t-c는 비동기 처리 과정의 에러만 잡아주지만, try catch문은 코드 진행 과정 전체에 대한 오류를 잡아준다.
        console.log(error);
    }
    // 읽기 쉬워짐, 가독성, 이해하기 쉬움. 그게 다임 ㅇㅇ
}

// 2 #2 주석처리
//fetchMovieList();

// axios
//     .get("https://yts.mx/api/v2/list_movies.json")
//     .then((response) => {
//         console.log(response);
//         const moviesList = response.data.data.movies;


//         axios.get(`https://yts.mx/api/v2/movie_suggestions.json?movie_id=${moviesList[0].id}`) //(`)백틱 사용
//             .then((response) => {
//                 // 연관 영화를 응답

//                 // 이렇게 비동기 처리의 중첩 (비동기 지옥, 시간&자원 낭비 및 에러 잡기 어려움 어딘지 모름)을 해결하기 위해
//                 // promise 객체를 이용해야 한다.
//                 console.log(response);
//             })
//             .catch((error) => {
//                 console.log(error);
//             })
//     })
//     .catch((error) => {
//         console.log(error);
//     })

// 3 #3 promise 객체 반환을 이용한 비동기 처리

// axios
//     .get("https://yts.mx/api/v2/list_movies.json?sort_by=rating") //pending 상태에서 성공하면 then으로
//     .then((response) => {
//         console.log("movie list");
//         console.log(response);
//         const movieList = response.data.data.movies;

//         return axios.get(// 타입 promise 객체 -> 다시 기다림(상태) 성공할 때까지
//             `https://yts.mx/api/v2/movie_suggestions.json?movie_id=${movieList[0].id}`
//         );
//     })
//     .then((response) => {
//         console.log("movie suggestions list");
//         console.log(response);
//         const movies = response.data.data.movies;

//         return axios.get(
//             `https://yts.mx/api/v2/movie_suggestions.json?movie_id=${movies[0].id}`
//         );
//     })
//     .then((response) => {
//         console.log(response);
//     })
//     .catch((error) => {
//         console.log(error);
//     });

//4 #4 async를 활용한 동기화 처리

// const fetchMovieDetail = async () => {
//     // 5 #5 try문으로 감싸줌으로써 에러 핸들링 완룟!
//     const listResponse = await axios.get(
//         "https://yts.mx/api/v2/list_movies.json?sort_by=rating"
//     );

//     console.log("movie list");
//     const movieList = listResponse.data.data.movies;

//     //
//     const suggestionResponse = await axios.get(
//         `https://yts.mx/api/v2/movie_suggestions.json?movie_id=${movieList[0].id}`
//     );

//     console.log("movie suggestion list");
//     const movies = suggestionResponse.data.data.movies;

//     const detailResponse = await axios.get(//await을 지우면 promise 객체(pending - 값을 모르는 상태)를 호출한다.
//         `https://yts.mx/api/v2/movie_details.json?movie_id=${movies[0].id}`
//     );
//     console.log("movie detail");
//     console.log(detailResponse);
// };
// fetchMovieDetail();


// 5번 최종 코드
const fetchMovieDetail = async () => {
    try {
        const listResponse = await axios.get(
            "https://yts.mx/api/v2/list_movies.json?sort_by=rating"
        );

        console.log("movie list");
        const movieList = listResponse.data.data.movies;

        //
        const suggestionResponse = await axios.get(
            `https://yts.mx/api/v2/movie_suggestions.json?movie_id=${movieList[0].id}`
        );

        console.log("movie suggestion list");
        const movies = suggestionResponse.data.data.movies;

        const detailResponse = axios.get(
            `https://yts.mx/api/v2/movie_details.json?movie_id=${movies[0].id}`
        );
        console.log("movie detail");
        console.log(detailResponse);
    } catch (error) {
        console.log(error);
    }
};
// fetchMovieDetail();
/////////////////////////////////vue//////////////////////////////
// const app = new Vue({ // {option}
//     el: "#app", //element - 준비과정 html의 객체를 vueJS 객체로 해석한다.
//     // delimeter: "[" //장고랑 템플릿 문법이 같기 때문에 바꿔주는 방법이 있다!
//     data() {
//         return {
//             message: "Jasmine",
//             className: "strong",
//             isShow: true,
//             list: [1, 2, 3],
//             // #7
//             isClicked: true,
//         }
//     },
//     computed: { //가격을 볼 때?
//         reversedMessage() { //message를 뒤집어서 보여줄 것임.
//             //#6 변수가 바뀔 때마다 다시 연산 후 반환해줌.
//             // computed 속성이란것이 있다!
//             // 어떤 데이터를 형식에 따라 변경시키는 데 사용된다.
//             // id만 뽑아서 개체에 담아서 json으로 만들고? 계속 사용할 수 있다?
//             // Q) argument를 가질 수 없어서 method처럼 사용할 수 없다.
//             return this.message.split("").reverse().join("");
//         }
//     },
//     methods: {
//         alertMessage() {
//             alert(this.message); // this==self 처럼 자기 자신 객체를 가져옴.
//         },
//         clickBtn() {
//             this.isClicked = !this.isClicked; //Clicked 를 전환 #7 계속
//         }
//     }
// });


//////////////////////////////////////////// New /////////////////////////////////////

const app = new Vue({
    el: "#app",
    data() { // #2 vue이 객체에서 전역변수로 쓰고자 하면 data 안에 넣어주면 된다.
        return {
            movieList: [],
            suggestedMovies: [],
        };
    },
    async created() {//created: function (){} 을 생략 가능
        //created는 vue 객체 생성될 때 실행된다.
        //created/update/ 등등 각각의 주기 싸이클이 다 있다. 자세한건 vue 문서 참고
        const response = await axios.get("https://yts.mx/api/v2/list_movies.json?sort_by=download_count");
        // #3 url 파라미터 변환(query string?), 다운로드 수 기준 정렬
        // #1 페이지가 생성된 후 요청해야 하므로 async 동기화
        this.movieList = response.data.data.movies;
        // #2 

        console.log(this.movieList);
    },
    // #4 인자로 코드를 받아야 링크를 반환할 수 있겠죠?
    methods: {
        getTrailerLink(code) {
            return `https://www.youtube.com/watch?v=${code}`;
        },
        async fetchDetails(movieId) {
            const suggestionResponse = await axios.get(
                `https://yts.mx/api/v2/movie_suggestions.json?movie_id=${movieId}`
            );
            console.log(suggestionResponse);
            this.suggestedMovies = suggestionResponse.data.data.movies;
            // #5 : <이미지 클릭시 관련 영화 반환 메소드> 동기인 이유는..?
            // 해당 정보를 data에 저장!

            // #8
            // this.suggestedMovies.map(async (movie) => {
            //     const detailResponse = await axios.get(
            //         `https://yts.mx/api/v2/movie_details.json?movie_id=${movie.id}`
            //     );
            //     movie["download_count"] = detailResponse.data.data.movie.download_count;
            //     console.log(detailResponse);
            // });

            // #9 <#8 -> 바꿈 ????????> 어렵다아앙
            const promises = this.suggestedMovies.map(async (movie) => { //안쪽에서 await을 사용하기 위함. then-catch를 사용해도 된다.
                const detailResponse = await axios.get(
                    `https://yts.mx/api/v2/movie_details.json?movie_id=${movie.id}`
                );
                movie["download_count"] = detailResponse.data.data.movie.download_count;
                console.log(detailResponse);
            });

            console.log(promises, promises[0]);//pending 리스트를 출력하고, 크롬에서 확인할 때(클릭하면) 다시 참조한다. 따라서 resolved상태임.
            await Promise.all(promises);
            console.log(promises[0]);
            // #10 await 추가 
            // all은 묶어주는 역할
            // 병렬처리로 인해 밑의 for문보다 빠르다.
            //Promise???




            // #6 : <연관 영화 디테일>  of는 list 대상으로 사용, in은 객체에서 사용 중요!!!!***
            // for (const movie of this.suggestedMovies) { //const를 써줘야 한다!
            //     const detailResponse = await axios.get(
            //         `https://yts.mx/api/v2/movie_details.json?movie_id=${movie.id}`
            //     );

            //     // #7 : <d
            //     movie["download_count"] = detailResponse.data.data.movie.download_count;
            //     console.log(detailResponse);
            // }
        }
    }
})