<script module lang="ts" >
	const imageLow = import.meta.glob(
		'$lib/assets/portfolio/lower/*.jpg',{
			eager: true,
			query: { enhanced: true }
		}
	)
    const imageHD = import.meta.glob(
		'$lib/assets/portfolio/hd/*.jpg',{
			eager: true,
			query: { enhanced: true }
		}
	)
    const imageMetadata = import.meta.glob(
		'$lib/assets/portfolio/metadata/*.json',{
			eager: true,
			query: { json: true }
		}
	)
    export const Images = () => {
        let arr: any = []
        let arrLength = Object.entries(imageMetadata).length
        for (let i = 0; i < arrLength; i++) {
            Object.entries(imageHD)[i]
            arr.push({
                imgHD: Object.entries(imageHD)[i][1],
                imgLow: Object.entries(imageLow)[i][1],
                imgMetadata: Object.entries(imageMetadata)[i][1],
            })
        }
        return arr
    }

</script>