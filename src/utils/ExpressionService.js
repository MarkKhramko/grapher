import{
	FUNCTION_ONE,
	FUNCTION_TWO
} from '../constants/ExpressionsConstants';

export function sine(x){
	const y = Math.sin(x);
	return y;
}

export function NPV_T(x, a, b, c){
	const y = a*(1- Math.pow((1.1+c/100),(-x)))/(0.1+c/100)-b;
	return y;
}

export function NPV_R(x, a, b, c){
	let y = a/(x+0.00001)*(1-Math.pow((1+x), (-c)))-b;
	if (y > 1e+9){
		y = 1e+9;
	}
	else if(y < -1e+9){
		y = -1e+9;
	}
	return y;
}

export const selectFunc = (functionConst)=>{
	switch(functionConst){
		case FUNCTION_ONE:{
			return NPV_T;
			break;
		}
		case FUNCTION_TWO:{
			return NPV_R;
			break;
		}
		default:
			return ()=>{};
			break;
	}
};

export const getFuncName = (functionConst)=>{
	switch(functionConst){
		case FUNCTION_ONE:{
			return "NPV(T)";
			break;
		}
		case FUNCTION_TWO:{
			return "NPV(R)";
			break;
		}
		default:
			return "-";
			break;
	}
};