export function sumByKey(arr: any[], key: string): number {
            if(!Array.isArray(arr)){
                return 0
            }
            return arr.reduce((sum, item: any) => {
                const value = item[key];
                return typeof value === 'number' ? sum + value : sum;
            }, 0);
        }