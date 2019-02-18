export function sine(x){
	const y = Math.sin(x);
	return y;
}

export function func1(x, a, b, c){
	const y = a*(1-(1.1+c/100)^(-x))/(0.1+c/100)-b;
	return y;
}

export function func2_t_t(x, a, b, c){
	const y = a*(1-1.1^(-x))/0.1-(1+c/100*(12*x+1)/24)*b;
	return y;
}

export function func2_t_5(x, a, b, c){
	const y = a*(1-1.1^(-x))/0.1-(1+c/100*61/24)*b;
	return y;
}

export function func2_t_10(x, a, b, c){
	const y = a*(1-1.1^(-x))/0.1-(1+c/100*121/24)*b;
	return y;
}

export function func3(x, a, b, c){
	const y = (a-(1+c/100*(12*x+1)/24)*b/x)*(1-(1+c/100)^(-x))/(c/100+0.0001);
	return y;
}