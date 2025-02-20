const ArticleCardSkeleton = () => {
    return (
        <div className='grid gap-8 sm:grid-cols-2 lg:grid-cols-3'>
            {[...Array(6)].map((_, index) => (
                <div key={index} className='group relative overflow-hidden translate-all'>
                    <div className='p-6'>
                        <div className='relative mb-4 h-48 w-full overflow-hidden rounded-xl bg-gray-300 animate-pulse'></div>
                        <h3 className='text-xl font-semibold bg-gray-300 h-6 w-3/4 mb-2 animate-pulse'></h3>
                        <p className='mt-2 bg-gray-300 h-4 w-1/2 animate-pulse'></p>
                        <div className='mt-6 flex items-center justify-between'>
                            <div className='flex items-center gap-3'>
                                <div className='bg-gray-300 rounded-full h-8 w-8 animate-pulse'></div>
                                <span className='text-sm bg-gray-300 h-4 w-24 animate-pulse'></span>
                            </div>
                            <div className='text-sm bg-gray-300 h-4 w-16 animate-pulse'></div>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default ArticleCardSkeleton;
