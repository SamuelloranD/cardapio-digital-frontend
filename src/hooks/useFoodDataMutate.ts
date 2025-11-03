import axios, { type AxiosPromise } from "axios"
import type { FoodData } from "../interface/FoodData";
import { useMutation, useQueryClient } from "@tanstack/react-query";

const API_URL = 'http://localhost:8080';

const postData = async(data : FoodData): AxiosPromise<any> => {
    const response = axios.post(API_URL + '/food', data)
    return response;
}

export function useFoodDataMutate() {
    const queryCient = useQueryClient(); 
    const mutate = useMutation({
        mutationFn: postData,
        retry: 2,
        onSuccess: () => {
            queryCient.invalidateQueries({ queryKey: ['food-data'] })

        }

    })

    return mutate;
}