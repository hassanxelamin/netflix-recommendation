from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
import pickle
import requests


app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Allows all origins
    allow_credentials=True,
    allow_methods=["*"],  # Allows all methods
    allow_headers=["*"],  # Allows all headers
)

movie = pickle.load(open('data/movies_list.pkl', 'rb'))
similarity = pickle.load(open('data/similarity.pkl', 'rb'))

def fetch_posters(movie_id):
    url = "https://api.themoviedb.org/3/movie/{}".format(movie_id)
    headers = {
        "accept": "application/json",
        "Authorization": "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI4OTYwNTM0MjJjYWEwMjNjZGY5OWJmZWVjYzk1OTA1YiIsInN1YiI6IjY1YzlhMDIyNDM1MDExMDE4M2VhOGI0NyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ._szJg-T9YRa1H0jHe-rr4-3t5Zv6WZK9XkpxnjzNQeY"
    }
    data = requests.get(url, headers=headers)
    new_data = data.json()
    poster_path = new_data['poster_path']
    full_path = "https://image.tmdb.org/t/p/w500" + poster_path
    return full_path

def recommend(movies_l):
    index = movie[movie["title"] == movies_l].index[0]
    distance = sorted(list(enumerate(similarity[index])), reverse=True, key=lambda vector: vector[1])
    recommend_movie = []
    recommend_poster = []
    for i in distance[1:31]:
        movies_id = movie.iloc[i[0]].id
        recommend_movie.append(movie.iloc[i[0]]['title'])
        recommend_poster.append(fetch_posters(movies_id))
    return recommend_movie, recommend_poster

@app.get("/recommendations/{movie_title}")
async def get_recommendations(movie_title: str):
    movie_recs, movie_poster = recommend(movie_title)
    return {"recommendations": movie_recs, "posters": movie_poster}

# movies_list=movie['title'].values

# st.header('Movie Recommender System')
# selectvalue=st.selectbox('Select a movie', movies_list)



# if st.button('Show Recommend'):
#     movie_recs, movie_poster = recommend(selectvalue)
#     col1, col2, col3, col4, col5 = st.columns(5)
#     with col1:
#         st.text(movie_recs[0])
#         st.image(movie_poster[0])
#     with col2:
#         st.text(movie_recs[1])
#         st.image(movie_poster[1])
#     with col3:
#         st.text(movie_recs[2])
#         st.image(movie_poster[2])
#     with col4:
#         st.text(movie_recs[3])
#         st.image(movie_poster[3])
#     with col5:
#         st.text(movie_recs[4])
#         st.image(movie_poster[4])