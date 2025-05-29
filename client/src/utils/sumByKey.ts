export function sumByKey(arr: any[], key: string): number {
            return arr.reduce((sum, item: any) => {
                const value = item[key];
                return typeof value === 'number' ? sum + value : sum;
            }, 0);
        }