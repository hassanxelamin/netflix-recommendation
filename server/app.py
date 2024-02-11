import streamlit as st
import pickle

movie = pickle.load(open('movies_list.pkl', 'rb'))
similarity = pickle.load(open('similarity.pkl', 'rb'))
movies_list=movie['title'].values

st.header('Movie Recommender System')
selectvalue=st.selectbox('Select a movie', movies_list)

def recommend(movies_l):
    index = movie[movie["title"] == movies_l].index[0]
    distance = sorted(list(enumerate(similarity[index])), reverse=True, key=lambda vector: vector[1])
    recommend_movie = []
    for i in distance[1:6]:
        recommend_movie.append(movie.iloc[i[0]]['title'])
    return recommend_movie


if st.button('Show Recommend'):
    movie_recs = recommend(selectvalue)
    col1, col2, col3, col4, col5 = st.columns(5)
    with col1:
        st.text(movie_recs[0])
    with col2:
        st.text(movie_recs[1])
    with col3:
        st.text(movie_recs[2])
    with col4:
        st.text(movie_recs[3])
    with col5:
        st.text(movie_recs[4])