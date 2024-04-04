import * as ocr_shape from '../reducers/__func.ocr_shape'
import * as ocr_summary from '../reducers/__func.ocr_summary'

/**
 * 
 * @returns 
 * 
 * @description
 * - return function_call and functions of function name
 */
export const getShapeFunctionCall = (

): { functions: any, function_call: {name: string} }  => {
    return {
        function_call   : ocr_shape.function_call,
        functions       : ocr_shape.functions
    }
}

export const getSummaryFunctionCall = (
): { functions: any, function_call: {name: string} }  => {
    return {
        function_call   : ocr_summary.function_call,
        functions       : ocr_summary.functions
    }
}