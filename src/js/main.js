import "../scss/main.scss";
import "babel-polyfill";
import axios from "axios";


const app = new Vue({
    el: "#app",
    data() { // #2 vue이 객체에서 전역변수로 쓰고자 하면 data 안에 넣어주면 된다.
        return {
            movieList: [],
            suggestedMovies: [],
        };
    },
    async created() {//created: function (){} 을 생략 가능

        const response = await axios.get("https://yts.mx/api/v2/list_movies.json?sort_by=download_count");
        this.movieList = response.data.data.movies;

        console.log(this.movieList);
    },
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

        }
    }
})