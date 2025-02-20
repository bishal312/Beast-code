import React from 'react'

const ArticleDetaileLoadingScreen = () => {
  return (
    <div className='min-h-screen bg-background'>
    <main className='container mx-auto py-12 px-4 sm:px-6 lg:px-8'>
        <article className='mx-auto max-w-3xl animate-pulse'>
            <header className='mb-12'>
                <div className='flex flex-wrap gap-2 mb-4'>
                    <div className='h-6 w-24 bg-gray-300 dark:bg-gray-700 rounded'></div>
                </div>
                <div className='h-10 w-full bg-gray-300 dark:bg-gray-700 rounded mb-4'></div>
                <div className='flex items-center gap-4'>
                    <div className='h-10 w-10 bg-gray-300 dark:bg-gray-700 rounded-full'></div>
                    <div>
                        <div className='h-4 w-32 bg-gray-300 dark:bg-gray-700 rounded mb-1'></div>
                        <div className='h-3 w-20 bg-gray-300 dark:bg-gray-700 rounded'></div>
                    </div>
                </div>
            </header>

            <section className='mb-12'>
                <div className='space-y-4'>
                    <div className='h-4 w-full bg-gray-300 dark:bg-gray-700 rounded'></div>
                    <div className='h-4 w-full bg-gray-300 dark:bg-gray-700 rounded'></div>
                    <div className='h-4 w-3/4 bg-gray-300 dark:bg-gray-700 rounded'></div>
                </div>
            </section>

            {/* Skeleton for action buttons */}
            <div className='h-10 w-28 bg-gray-300 dark:bg-gray-700 rounded mb-6'></div>

            {/* Skeleton for comment input */}
            <div className='h-20 w-full bg-gray-300 dark:bg-gray-700 rounded mb-6'></div>

            {/* Skeleton for comments */}
            <div className='space-y-4'>
                {[1, 2, 3].map((_, index) => (
                    <div key={index} className='flex items-start gap-4'>
                        <div className='h-10 w-10 bg-gray-300 dark:bg-gray-700 rounded-full'></div>
                        <div className='space-y-2 w-full'>
                            <div className='h-4 w-1/2 bg-gray-300 dark:bg-gray-700 rounded'></div>
                            <div className='h-3 w-full bg-gray-300 dark:bg-gray-700 rounded'></div>
                        </div>
                    </div>
                ))}
            </div>
        </article>
    </main>
</div>

  )
}

export default ArticleDetaileLoadingScreen;