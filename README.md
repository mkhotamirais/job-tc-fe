# React/Nextjs TMDB Mkhotami
This project was created as a requirement for applying as a Frontend Developer at Company EnterKomputer. This project was built using NextJs, typescript and fetch data from [TMDB](https://www.themoviedb.org/)

This project contains:
1. Page Utama : 
    - State Now Playing Movie Card (limit 6)
    - State Popular Movie Card (limit 30) dengan fitur load more per 6 Movie
    - Add to Favorite setiap Card Movie
2. Page Profil :
    - List Favorite Movie
3. Page Login :
    - Login User / continue as A Guest

You can [run this project directly](https://job-tc-fe.vercel.app/) or locally by following instructions bellow:

## Pre-requisite
make sure you have installed the following tools:

- Install [Nodejs](https://nodejs.org/en)
- Install [Typescript](https://www.typescriptlang.org/)
- Registrasi [Tmdb Account](https://www.themoviedb.org/signup) or you can login as a guest

## Installation Project
Open your local terminal and clone command below:
```
git clone https://github.com/mkhotamirais/job-tc-fe.git
```
Change the directory
```
cd job-tc-fe
```
Install dependencies
```
npm install
```
create `.env` or `.env.local` in the root of the repo/folder (job-tc-fe) and fill it with the following variables:
```
NEXT_PUBLIC_BASE_URL=https://api.themoviedb.org/3
NEXT_PUBLIC_BASIC_IMAGE=https://image.tmdb.org/t/p/original
NEXT_PUBLIC_API_KEY={your_api_key}
NEXT_PUBLIC_API_ACCESS_TOKEN={your_api_read_access_token}

```
you can get your `api_key` and your `api_read_access_token` on your [TMDB Account](https://www.themoviedb.org/settings/api)

## Running the project locally
run development locally:
```
npm run dev
```


