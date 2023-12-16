import React from 'react'

const FeedbackCard = ({feed}) => {
  return (
    
    <article className="col-lg-6 mb-4">
    <section className="card">
      <main className="card-body p-4">
        <div className="d-flex">
          <div className="flex-shrink-0"><i className="bi bi-chat-right-quote-fill text-success fs-1" /></div>
          <div className="ms-4">
            <p className="mb-1">{feed.feedback}</p>
            <div className="small text-muted">- {feed.customer}, {feed.location}</div>
          </div>
        </div>
      </main>
    </section>
  </article>
  )
}

export default FeedbackCard